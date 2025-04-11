link:
	rm -rf package-lock.json node_modules && yalc update devkit-admin && pnpm cache delete && pnpm i
	
sync_api:
	pnpm cache delete && rm -rf node_modules/@buf/ahmeddarwish_devkit-api.bufbuild_es && pnpm add @buf/ahmeddarwish_devkit-api.bufbuild_es@${V}


install:
	pnpm config set @buf:registry https://buf.build/gen/npm/v1/ && rm -rf node_modules &&  pnpm i 

run:
	pnpm run dev
