link:
	rm -rf package-lock.json node_modules/devkit-admin && yalc update devkit-admin && pnpm cache delete && pnpm i
	
sync_api:
	pnpm cache delete && rm -rf node_modules/@buf/ahmeddarwish_devkit-api.bufbuild_es && pnpm add @buf/ahmeddarwish_devkit-api.bufbuild_es@${V}


deploy:
	pnpm run build && scp -r dist/* ybl:src/apps/clients/admin.abchotels-eg.com/
install:
	pnpm config set @buf:registry https://buf.build/gen/npm/v1/ && rm -rf node_modules &&  pnpm i 

run:
	pnpm run dev
