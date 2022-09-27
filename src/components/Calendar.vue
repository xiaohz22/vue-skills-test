<template>
    <div class="calendar">
		<div class="top">
			<button type="button" onclick="prev()">上个月</button>
			<div id="month"></div>
			<button type="button" onclick="next()">下个月</button>
		</div>
		<div class="week">
			<div class="evrday">日</div>
			<div class="evrday">一</div>
			<div class="evrday">二</div>
			<div class="evrday">三</div>
			<div class="evrday">四</div>
			<div class="evrday">五</div>
			<div class="evrday">六</div>
		</div>
		<div id="day"></div>
    </div>
</template>

<script setup>

</script>

<style>
.calendar {

}
</style>