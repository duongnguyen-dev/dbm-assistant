RUN_FRONTEND_DIR=run_frontend.sh
RUN_BACKEND_DIR=run_backend.sh
RUN_APP_DIR=run_app.sh

run_frontend:	
	cd scripts && chmod +x ${RUN_FRONTEND_DIR} && bash ${RUN_FRONTEND_DIR}

run_backend:
	cd scripts && chmod +x ${RUN_BACKEND_DIR} && bash ${RUN_BACKEND_DIR}

run_app:
	cd scripts && chmod +x ${RUN_APP_DIR} && bash ${RUN_APP_DIR}