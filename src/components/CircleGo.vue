<template>
    <div class="container">
        <div class="root" ref="root">
            <div class="outer" ref="outerRef">
                <div class="inner" ref="innerRef"></div>
                <div class="initTime first">00:00</div>
                <div class="initTime second">06:00</div>
                <div class="initTime third">12:00</div>
                <div class="initTime fourth">18:00</div>
            </div>
            <canvas width="242" height="242" ref="canvas" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);"></canvas>
            <!-- <div v-if="platform === 'mobile'" class="circle" :style="circleStyle" @touchstart="e => startDrag(e, -1)"></div> -->
            <!-- <div v-else class="circle" :style="circleStyle" @mousedown="startDrag"></div> -->
            <div v-for="(point, index) in timePointList" 
                :key="point.x" class="circle" 
                :style="{ left: `${point.x}px`, top: `${point.y}px`, zIndex: index }" 
                @mousedown="e => startDrag(e, index)">
            </div>
            <div class="center" :style="centerStyle"></div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, onUnmounted, watch, computed, watchEffect } from 'vue';

const props = defineProps({
    timeList: {
        type: Array<number>,
        default: []
    }
})

const emits = defineEmits(['updateCurPointTime'])

const innerRef = ref<HTMLElement>()
const root = ref<HTMLElement>()

/** 确定点位 */
const centerStyle = reactive({
    width: '3px',
    height: '3px',
    background: 'red',
    top: '0px',
    left: '0px',
    transform: 'translate(-50%, -50%)'
})
const center = ref<number[]>([])
const r = 100
// 传入的时间点位：组件传入时间戳，转化得到今天已经历的时间分钟数
// const timeList = ref<number[]>([360, 478, 910, 1080, 1221]) 
const time0600 = 360
const time1800 = 1080 
const timePointList = ref<{ x: number, y: number }[]>([])
const curPoinIndex = ref<number>(-1)
const curPointInitXY = { x: -1, y: -1 } // 保存被点击的点位的初始位置x、y
const initTimePoint = () => {
    // radian * 180 / Math.PI = 角度
    // 圆盘总360deg 1deg = 4min, 1min = 0.25deg
    timePointList.value = props.timeList.map((item: any) => {
        const radian = getRadianByMins(item)
        const newX = center.value[0] + Math.cos(radian) * r; // Math.cos(radian) * r = x的长度
        const newY = center.value[1] + Math.sin(radian) * r; // Math.sin(radian) * r = y的长度
        return { x: newX, y: newY }
    })
}
onMounted(() => {
    const centerX = outerRef.value!.offsetLeft
    const centerY = outerRef.value!.offsetTop
    center.value[0] = centerX 
    center.value[1] = centerY
    centerStyle.left = center.value[0] + 'px'
    centerStyle.top = center.value[1] + 'px'
    initTimePoint()
})

/** 滑动操作 */
const outerRef = ref<HTMLElement>()
const isDragging = ref(false);
const offsetX = ref(0);
const offsetY = ref(0);

const startDrag = (event: any, index: number) => {
    isDragging.value = true;
    offsetX.value = (platform.value === 'web' ? event.clientX : event.targetTouches[0].clientX) - event.target.offsetLeft;
    offsetY.value = (platform.value === 'web' ? event.clientY : event.targetTouches[0].clientY) - event.target.offsetTop;
    curPoinIndex.value = index
    curPointInitXY.x = timePointList.value[index].x
    curPointInitXY.y = timePointList.value[index].y
};


const drag = (event: any) => {
    if (isDragging.value) {
        const x = (platform.value === 'web' ? event.clientX : event.targetTouches[0].clientX) - offsetX.value;
        const y = (platform.value === 'web' ? event.clientY : event.targetTouches[0].clientY) - offsetY.value;

        // const r = 100; // 圆的半径
        const centerX = outerRef.value!.offsetLeft
        const centerY = outerRef.value!.offsetTop
        const radian  = Math.atan2(y - centerY, x - centerX); // (x, y)到(0, 0)的线与x轴的弧度值
        // console.log('radian', radian * 180 / Math.PI) // radian * 180 / Math.PI = 角度
        // console.log('radian', radian)
        const newX = centerX + Math.cos(radian) * r; // Math.cos(radian * r = x的长度
        const newY = centerY + Math.sin(radian) * r; // Math.sin(radia) * r = y的长度

        /** 绘制圆弧规则 */
        const currentRuleRadian = getArcRuleRadian(radian)
        /** 拖动最大mins点位 */
        if (isMaxTimePoint.value) {
            clearCanvas()
            draw(initStartRadian.value, currentRuleRadian, false)
        }
        /** 拖动最小mins点位 */
        if (isMinTimePoint.value) {
            clearCanvas()
            draw(currentRuleRadian, initEndRadian.value, false)
        }

        /** 拖动改变每个点位的位置 */
        timePointList.value[curPoinIndex.value].x = newX
        timePointList.value[curPoinIndex.value].y = newY
    }
};

const endDrag = (event: MouseEvent) => {
    if (!isDragging.value) return
    const x = event.clientX - offsetX.value;
    const y = event.clientY - offsetY.value;
    const radian  = Math.atan2(y - center.value[1], x - center.value[0])
    const currentAngle = radian * 180 / Math.PI
    // const angleRule360 = (currentAngle + 360) % 360
    // console.log('currentAngle', currentAngle)

    let recoveryPoint: any = () => {
        timePointList.value[curPoinIndex.value].x = curPointInitXY.x
        timePointList.value[curPoinIndex.value].y = curPointInitXY.y
    }

    /** 最小点位的mins不能超过最大点位的mins，否则不允许绘制 */
    if (isMinTimePoint.value) {
        const maxMins = Math.max(...props.timeList) 
        if (getAngleMins(currentAngle) >= maxMins) {
            recoveryPoint()
            const initRuleRadian = getArcRuleRadian(getRadianByMins(props.timeList[curPoinIndex.value]))
            clearCanvas()
            draw(initRuleRadian, initEndRadian.value)
            isDragging.value = false;
            return
        }
    }
    /** 最大点位的mins不能小于最小点位的mins，否则不允许绘制 */
    if (isMaxTimePoint.value) {
        const minMins = Math.min(...props.timeList) 
        if (getAngleMins(currentAngle) <= minMins) {
            recoveryPoint()
            const initRuleRadian = getArcRuleRadian(getRadianByMins(props.timeList[curPoinIndex.value]))
            clearCanvas()
            draw(initStartRadian.value, initRuleRadian)
            isDragging.value = false;
            return
        }
    }
    /** 中间点位mins不能超过两侧点位 */
    if (!isMaxTimePoint.value && !isMinTimePoint.value) {
        const curIndex = curPoinIndex.value
        const prevMins = props.timeList[curIndex - 1]
        const nextMins = props.timeList[curIndex + 1]
        if (getAngleMins(currentAngle) < prevMins || getAngleMins(currentAngle) > nextMins) {
            recoveryPoint()
            isDragging.value = false;
            return
        }
    }

    const mins = getAngleMins(currentAngle)
    emits('updateCurPointTime', mins, curPoinIndex.value)

    isDragging.value = false;
    recoveryPoint = null
}

/** 获取角度对应的mins */
const getAngleMins = (angel: number) => {
    let mins = 0
    if (angel >= 0) {
        // 18:00 ~ 06:00
        if (angel === 180) {
            mins = 360
            console.log('清晨')
        } else if (angel === 0) {
            mins = 1080
            console.log('傍晚')
        } else if (angel === 90) {
            mins = 1440
            console.log('午夜')
        } else if (angel === -90) {
            mins = 720
            console.log('正午')
        } else if (angel > 90 && angel < 180) {
            mins = (angel - 90) / 0.25
            console.log('end', convertMinutesToTime(mins))
        } else if (angel > 0 && angel < 90) {
            mins = (270 + angel) / 0.25
            console.log('end', convertMinutesToTime(mins))
        }   
    } else {
        // 06:00 ~ 18:00
        mins = time1800 - angel / -0.25
        console.log('end', convertMinutesToTime(mins))
    } 
    return mins
}

/** canvas绘制圆弧的弧度规则 0~2Π */
const getArcRuleRadian = (radian: number) => {
    const ruleRadian = radian < 0 ? (2 * Math.PI + radian) : radian
    return ruleRadian
}

/** 转化分钟为今天具体的时间 */
const convertMinutesToTime = (mins: number) => {
  let hours = Math.floor(mins / 60);
  let minutes = mins % 60;

  let time = new Date();
  time.setHours(hours);
  time.setMinutes(minutes);

  return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

/** 获取mins对应的radian（弧度） */
const getRadianByMins = (timeMins: number) => {
    let timeAngle = -1
    if (timeMins > time0600 && timeMins < time1800) {
        // 负角度 -180deg - 0deg
        const difference = time1800 * 0.25 - timeMins * 0.25
        timeAngle = -difference
    } else if (timeMins > time1800) {
        // 正角度 0deg - 90deg
        timeAngle = 90 - (360 - timeMins * 0.25)
    } else if (timeMins < time0600) {
        // 正角度 90deg - 180deg
        timeAngle = timeMins * 0.25 + 90 
    } else if (timeMins === time0600) {
        timeAngle = 180
    } else if (timeMins === time1800) {
        timeAngle = 0
    }
    const radian = timeAngle * Math.PI / 180 
    return radian
}

const canvas = ref<any>(null)
const draw = (startRadian: number, endRadian: number, direction = false) => {
    const cvs = canvas.value
    const ctx = cvs.getContext('2d')
    ctx.lineWidth = 20;
    ctx.strokeStyle = '#0577E4'
    ctx.beginPath();
    ctx.arc(120, 120, r, startRadian, endRadian, direction);
    ctx.stroke();
}
const clearCanvas = () => {
    const cvs = canvas.value
    const ctx = cvs.getContext('2d')
    ctx.clearRect(0, 0, cvs.width, cvs.height);
}

/** mins最小点初始弧度（应用canvas弧度规则） */
const initStartRadian = computed(() => {
    let initStartRadian = getRadianByMins(Math.min(...props.timeList))
    initStartRadian = initStartRadian < 0 ? (2 * Math.PI + initStartRadian) : initStartRadian
    return initStartRadian
})
/** mins最大点初始弧度（应用canvas弧度规则） */
const initEndRadian  = computed(() => {
    let initEndRadian = getRadianByMins(Math.max(...props.timeList))
    initEndRadian = initEndRadian < 0 ? (2 * Math.PI + initEndRadian) : initEndRadian
    return initEndRadian
})

const isMaxTimePoint = computed(() => {
    return props.timeList[curPoinIndex.value] === Math.max(...props.timeList)
})
const isMinTimePoint = computed(() => {
    return props.timeList[curPoinIndex.value] === Math.min(...props.timeList)
})

watch(() => [initStartRadian.value, initEndRadian.value], () => {
    // console.log(initStartRadian.value, initEndRadian.value, 'props.timeList')
    initTimePoint()
    clearCanvas()
    draw(initStartRadian.value, initEndRadian.value)
})

onMounted(() => {
    draw(initStartRadian.value, initEndRadian.value)
    window.addEventListener('touchmove', drag)
    window.addEventListener('touchend', () => endDrag)
    window.addEventListener('mousemove', drag);
    window.addEventListener('mouseup', endDrag);
});

onUnmounted(() => {
    window.removeEventListener('touchmove', drag)
    window.removeEventListener('touchend', () => endDrag)
    window.removeEventListener('mousemove', drag);
    window.removeEventListener('mouseup', endDrag);
});

/** 判断平台 */
const platform = ref<string>('web')
const judgePlatform = () => {
    const info = navigator.userAgent.toLowerCase()
    if (info.includes('iphone os')) {
        platform.value = 'mobile'
    } else {
        platform.value = 'web'
    }
}
judgePlatform()

</script>

<style lang="scss" scoped>
.container {
  position: relative;
//   width: 100vw;
//   height: 100vh;
  user-select: none;
}

.root {
    position: relative;
    width: 300px;
    height: 300px;
    margin: 100px 100px;
}

.inner {
    position: absolute;
    width: 180px;
    height: 180px;
    border: 1px solid #ccc;
    top: 50%;
    left: 50%;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
}

.circle {
  position: absolute;
  width: 20px;
  height: 20px;
  background: #0577E4;
  box-shadow: 0px 1px 8px 0rpx rgba(42, 44, 45, 0.15);
  border: 4px solid #FFFFFF;
  border-radius: 50%;
  cursor: grab;
  z-index: 99;
  transform: translate(-50%, -50%),
}

.outer {
    position: absolute;
    width: 220px;
    height: 220px;
    border: 1px solid #ccc;
    top: 50%;
    left: 50%;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    background: #ccc;
    .initTime {
        position: absolute;
        &.first {
            bottom: 0;
            left: 50%;
            transform: translate(-50%, 120%);
        }
        &.second {
            top: 50%;
            left: 0;
            transform: translate(-120%, -50%);
        }
        &.third {
            top: 0;
            left: 50%;
            transform: translate(-50%, -120%);
        }
        &.fourth {
            top: 50%;
            right: 0;
            transform: translate(120%, -50%);
        }
    }
}

.center {
    position: absolute;
}
</style>