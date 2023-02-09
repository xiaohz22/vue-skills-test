<template>
    <div class="porePlate-box" ref="plateBox">
        <table class="plate-box">
            <tr>
                <th></th>
                <th v-for="(colNum, index) in colList" :key="index * Math.random()">{{ colNum }}</th> 
            </tr>
            <tr>
                <th>A</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <!-- <td v-for="(_, index) in slotList" :key="index * Math.random()"></td> -->
            </tr>
            <tr>
                <th>B</th>
                <td v-for="(_, index) in slotList" :key="index * Math.random()"></td>
            </tr>
            <tr>
                <th>C</th>
                <td v-for="(_, index) in slotList" :key="index * Math.random()"></td>
            </tr>
            <tr>
                <th>D</th>
                <td v-for="(_, index) in slotList" :key="index * Math.random()"></td>
            </tr>
            <tr>
                <th>E</th>
                <td v-for="(_, index) in slotList" :key="index * Math.random()"></td>
            </tr>
            <tr>
                <th>F</th>
                <td v-for="(_, index) in slotList" :key="index * Math.random()"></td>
            </tr>
            <tr>
                <th>G</th>
                <td v-for="(_, index) in slotList" :key="index * Math.random()"></td>
            </tr>
            <tr>
                <th>H</th>
                <td v-for="(_, index) in slotList" :key="index * Math.random()"></td>
            </tr>
        </table>
        <div class="sel-area" ref="selArea">
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { onMounted, reactive, ref } from 'vue';

    const props = defineProps({
        col: {
            type: Number,
            default: 12
        }
    });

    const arr = Array.from({length: 12}, (_, index) => index + 1);
    const slotArr = new Array(12).fill('');
 
    const colList = reactive(arr.slice(0, props.col))
    const slotList = reactive(slotArr.slice(0, props.col))

    // 选区
    const selArea = ref<null | HTMLElement>(null)
    // 框选相关参数
    const selObj = {
        // 选框开始位置
        startX: 0,
        startY: 0,
        // 鼠标点击时起始位置
        firstX: 0,
        firstY: 0,
        // 框选的区域宽高
        selWidth: 0,
        selHeight: 0,
        // 是否开启框选
        isSelect: false,
    }
    // 整片插板
    const plateBox = ref<null | HTMLElement>(null)
    onMounted(() => {
        plateBox.value && plateBox.value.addEventListener('mousedown', function (e) {
            selObj.isSelect = true;
            selObj.startX = e.pageX - plateBox.value!.offsetLeft;
            selObj.startY = e.pageY - plateBox.value!.offsetTop;
            selObj.firstX = e.pageX;
            selObj.firstY = e.pageY;
            if (selArea.value) {
                selArea.value.style.left = selObj.startX + 'px';
                selArea.value.style.top = selObj.startY + 'px';
            }
        })

        plateBox.value && plateBox.value.addEventListener('mousemove', move)

        plateBox.value && plateBox.value.addEventListener('mouseup', function (e) {
            if(!selObj.isSelect) return;
            selObj.isSelect = false
            if (selArea.value) {
                selObj.selWidth = Number(selArea.value.style.width.split('p')[0]);
                selObj.selHeight = Number(selArea.value.style.height.split('p')[0]);
                selArea.value.style.width = 0 + 'px';
                selArea.value.style.height = 0 + 'px';
                selArea.value.style.left = '0';
                selArea.value.style.top = '0';
                selArea.value.style.border = 'none';
                // selArea.value.style.display = 'none';
            }
            console.log(selObj.selWidth, 'selWidth')
            console.log(selObj.selHeight, 'selHeight')
        })

        plateBox.value && plateBox.value.addEventListener('mouseleave', function (e) {
            selObj.isSelect = false;
            if (selArea.value) {
                selArea.value.style.width = 0 + 'px';
                selArea.value.style.height = 0 + 'px';
                selArea.value.style.left = '0';
                selArea.value.style.top = '0';
                selArea.value.style.border = 'none';   
                // selArea.value.style.display = 'none';
            }
        })
    })

    function move(e: any) {
        if (!selObj.isSelect) return;
        if (selArea.value) {
            selArea.value.style.border = '1px solid red';
            if (e.pageX < selObj.firstX) {
                selArea.value.style.width = (selObj.firstX - e.pageX) + 'px';
                selArea.value.style.left = (e.pageX - plateBox.value!.offsetLeft) + 'px';
            } else {
                selArea.value.style.width = (e.pageX - selObj.firstX) + 'px';
                // selArea.style.left = firstX + 'px';
            }
            if (e.pageY < selObj.firstY) {
                selArea.value.style.height = (selObj.firstY - e.pageY) + 'px';
                selArea.value.style.top = (e.pageY - plateBox.value!.offsetTop) + 'px';
            } else {
                selArea.value.style.height = (e.pageY - selObj.firstY) + 'px';
                // selArea.style.top = firstY + 'px';
            }
            // 这里还可能需要拿到bottom和right
        }
    }
</script>

<style lang="scss" scoped>
    .porePlate-box {
        position: relative;
        width: 435px;
        > table {
            // width: 100%; 
            td {
                width: 30px;
                height: 30px;
                border-radius: 6px;
                border: 1px solid #ccc;
            }
            th {
                cursor: default;
            }
        }

        .sel-area {
            position: absolute;
            left: 0;
            top: 0;
            pointer-events: none;
        }
    }

</style>