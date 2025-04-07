link:
	npm link devkit-admin 
	
sync_api:
	pnpm cache delete && pnpm add @buf/ahmeddarwish_devkit-api.bufbuild_es@${V}


install:
	pnpm config set @buf:registry https://buf.build/gen/npm/v1/ && rm -rf node_modules &&  pnpm i && make link

run:
	pnpm run dev
