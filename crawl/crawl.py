import os
import time
import json
import multiprocessing
import logging
import pandas as pd

from multiprocessing import Process, Manager
from multiprocessing.managers import ListProxy
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import NoSuchElementException, ElementClickInterceptedException
from helpers import *
from config import *

# def distributed_crawler(urls):
#     processes = []
#     if len(urls) < multiprocessing.cpu_count():
#         max_processes = len(urls)

#     max_processes = min(len(urls), multiprocessing.cpu_count())

#     for i in range(max_processes):
#         p = Process(target=func, args=(urls[i], wait_timeout, shared_dict))
#         processes.append(p)
#         p.start()
    
#     for p in processes:
#         p.join()

def crawl_data(url: str, wait_timeout: int, shared_list: list):
    # Allow a pop-up window to be incognito mode
    chrome_options = Options()
    chrome_options.add_argument("--incognito")
    driver = webdriver.Chrome(options=chrome_options)

    driver.get(url)

    while True:
        try:
            driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
            time.sleep(wait_timeout)
            
            show_more_button = driver.find_element(By.XPATH, '//button[text()="Show more"]')
            show_more_button.click()
        except NoSuchElementException:
            logging.info("No more 'Show more' button found. The page is fully loaded.")
            break
        except ElementClickInterceptedException:
            # If the button is not clickable at the moment, wait and try again
            logging.info("Button not clickable, retrying...")
            time.sleep(wait_timeout)

    time.sleep(wait_timeout)
    soup = BeautifulSoup(driver.page_source, features="html.parser")
    target_divs = soup.findAll("div", class_="dne-itemtile-detail")
    print(f"Number of items: {len(target_divs)}")

    for div in target_divs:
        link = div.find('a')
        driver.get(link["href"])

        soup = BeautifulSoup(driver.page_source, features="html.parser")
        # Get all image from the item page
        item_images_div = soup.find("div", class_="ux-image-carousel-container image-container")
        item_image_link = item_images_div.findAll("img")[0]['src']

        # Get name of the item
        item_name = soup.find("div", class_="vim x-item-title").find("span").get_text()

        # Get item's price information 
        item_price = soup.find("div", class_="x-bin-price__content")
        item_price_primary = item_price.find("div", class_="x-price-primary").find("span").get_text()
        item_price_discount = None

        if item_price.find("span", class_="x-price-transparency--discount") != None:
            if item_price.find("span", class_="x-price-transparency--discount").find("span", "ux-textspans ux-textspans--EMPHASIS") != None:
                item_price_discount = item_price.find("span", class_="x-price-transparency--discount").find("span", "ux-textspans ux-textspans--EMPHASIS").get_text()      
        
        # Get item's condition 
        item_condition = soup.find("div", class_="x-quantity__availability").findAll("span")
        item_availability = item_condition[0].get_text()
        
        # Get item's specification
        item_specification = soup.find("div", class_="vim x-about-this-item")
        item_specification_labels = item_specification.findAll("div", class_="ux-labels-values__labels-content")
        item_specification_labels = [item_specification_label.find("span").get_text() for item_specification_label in item_specification_labels]
        item_specification_values = item_specification.findAll("div", class_="ux-labels-values__values-content")
        item_specification_values = [item_specification_value.find("span").get_text() for item_specification_value in item_specification_values]
        item_specification = dict(zip(item_specification_labels, item_specification_values))

        item = {
            "name": item_name,
            "image_url": item_image_link,
            "price": item_price_primary,
            "discount": item_price_discount,
            "availability": item_availability,
            "specification": item_specification
        }

        shared_list.append(item)
if __name__ == "__main__":
    cfg = load_config(CONFIG_DIR)

    shared_list = []

    for url in cfg["seed_urls"]:
        crawl_data(url, 5, shared_list)
    
    df = pd.DataFrame.from_dict(shared_list)
    df.to_csv("output.csv")