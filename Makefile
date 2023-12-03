backend-ssh:
	docker exec -it nest_template_server sh


# DB関連
## 初期セットアップ
db-setup:
	make db-migrate && make db-seed
# マイグレーション
db-migrate:
	docker exec -it nestjs_output_with_crud_auth_backend sh -c "npm run migrate"
# シーディング
db-seed:
	docker exec -it nestjs_output_with_crud_auth_backend sh -c "npm run seed"