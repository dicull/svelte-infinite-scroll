<script>
	import { onMount, onDestroy, createEventDispatcher } from 'svelte';
	/*
        child element 가 없으면 window 스크롤 기준, 있으면 parent element 스크롤 기준으로 이벤트 생성
        <ul>
            <InfiniteScroll>
                <li></li>
                <li></li>
            </InfiniteScroll>
        </ul>
    */
	export let existMore = true; // 더이상 불러올 데이터가 없으면 false
	export let thresholdPos = 0; // 추가 로드를 일으킬 경계
	let scrollElement;

	const dispatch = createEventDispatcher();
	let isLoadingMore = false;

	const onScroll = (e) => {
		const element = !e.target.tagName ? document.body : e.target;
		if (existMore && element.scrollTop !== 0) {
			let offset = element.scrollHeight - element.clientHeight - element.scrollTop;
			if (offset <= thresholdPos) {
				if (!isLoadingMore) {
					dispatch('loadMore');
				}
				isLoadingMore = true;
			} else {
				isLoadingMore = false;
			}
		}
	};

	onMount(() => {
		if ($$slots.default) {
			scrollElement = scrollElement.parentNode;
		} else {
			scrollElement = window;
		}
		scrollElement.addEventListener('scroll', onScroll);
	});

	onDestroy(() => {
		scrollElement?.removeEventListener('scroll', onScroll);
	});
</script>

{#if $$slots.default}
	<slot />
	<div bind:this={scrollElement} style="width: 0px;height: 0px;" />
{/if}
