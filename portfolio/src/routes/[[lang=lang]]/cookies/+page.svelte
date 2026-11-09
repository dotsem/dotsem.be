<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import CookieItem from '$lib/components/cookie-consent/CookieItem.svelte';
	import * as m from '$lib/paraglide/messages.js';
</script>

<Seo title={m.cookie_page_title()} description={m.cookie_page_description()} />

<div class="container mx-auto max-w-4xl px-4 py-12">
	<div>
		<h1 class="mb-8 text-4xl font-bold text-foreground">
			{m.cookie_page_title()}
		</h1>

		<p class="mb-8 text-lg leading-relaxed text-gray-300">
			{m.cookie_page_description()}
		</p>
		<hr />

		<div>
			<CookieItem
				name={m.cookie_list_inlang()}
				purpose={m.cookie_list_inlang_desc()}
				icon="fa-language"
			/>
			<!-- <CookieItem
                name={m.cookie_list_theme()}
                purpose={m.cookie_list_theme_desc()}
                icon="fa-sun"
            /> -->
			<CookieItem
				name={m.cookie_list_analytics()}
				purpose={m.cookie_list_analytics_desc()}
				icon="fa-chart-line"
			/>
		</div>
	</div>
</div>
