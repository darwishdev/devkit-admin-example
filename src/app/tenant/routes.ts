import TenantListView from './tenant/views/TenantListView.vue'
import SectionListView from './section/views/SectionListView.vue'
import PartialListView from './partial/views/PartialListView.vue' // Same as SectionListView?
import PageListView from './page/views/PageList.vue'

export default
	[
		{
			path: '/tenants/tenant',
			name: 'tenant_list',
			component: TenantListView,
		},
		{
			path: '/tenants/section',
			name: 'section_list',
			component: SectionListView,
		},
		{
			path: 'tenants/partial',
			name: 'partial_list',
			component: PartialListView,
		},
		{
			path: 'tenants/page',
			name: 'page_list',
			component: PageListView,
		},
	]
