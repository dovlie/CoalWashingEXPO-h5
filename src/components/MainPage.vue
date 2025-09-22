<template>
  <div class="bg">
    <HeadTop />
    <el-tabs class="tabs" v-model="tabPosition" @tab-click="handleChangeTab">
      <el-tab-pane label="工厂总览" name="left">
        <div class="tabs-left" v-if="tabPosition === 'left'">
          <div class="workshop-switch">
            <div class="workshop-wrap" v-for=" (i, i_inx) in leftTabsList" :key="i.id" :style="columnSpan(i.span)">
              <div class="title">{{ i.title }}</div>
              <div class="workshop-container">
                <div :class="`workshop ${isActive(i_inx, c_inx) ? 'workshop-active' : 'workshop-noactive'} ${c.isOpen === 'N' ? 'disable' : ''}`"
                  v-for="(c, c_inx) in i.children" :key="c.id" @click="handleWorkshop(c, i_inx, c_inx)">{{ c.title }}
                </div>
              </div>
            </div>
          </div>
          <div class="line" />
          <div class="equipment-switch">
            <!-- <div> -->
              <div v-for="(v, inx) in nowWorkshopChildren" :key="v.id">
                <div v-if="inx === 0"> 
                  <div class="title">{{ v.title }}</div>
                  <div :class="`mode ${x_inx === activeSlide ? 'mode-active' : 'mode-noactive'}`"
                    v-for="(x, x_inx) in v.children" :key="x.id" @click="handleMode(x, x_inx)">{{ x.title }}</div>
                </div>
                <div v-if="inx === 1"> 
                  <div class="title">{{ v.title }}</div>
                  <div :class="`mode ${x_inx === activeTipsSlide ? 'mode-active' : 'mode-noactive'}`"
                    v-for="(x, x_inx) in v.children" :key="x.id" @click="handleTips(x, x_inx)">{{ x.title }}</div>
                </div>
              </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="车间内部" name="right">
        <div class="tabs-right" v-if="tabPosition === 'right'">
          <div class="workshop-switch">
            <div class="workshop-wrap" v-for=" (i, i_inx) in rightTabsList" :key="i.id" :style="columnSpan(i.span)">
              <div class="title">{{ i.title }}</div>
              <div class="workshop-container">
                <div :class="`workshop ${isActive(i_inx, c_inx) ? 'workshop-active' : 'workshop-noactive'} ${c.isOpen === 'N' ? 'disable' : ''}`"
                  v-for="(c, c_inx) in i.children" :key="c.id" @click="handleProductionWorkshop(c, i_inx, c_inx)">
                  {{ c.title }}</div>
              </div>
            </div>
          </div>
          <div class="line" />
          <div class="equipment-switch">
            <div :class="`mode ${x_inx === activeSlideShop ? 'mode-active' : 'mode-noactive'}`"
              v-for="(v, x_inx) in nowWorkshopChildren" :key="v.id" @click="handleProductionMode(v, x_inx)">
              {{ v.title }}
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import HeadTop from './HeadTop.vue'
import { throttle, fixedInfo } from '@/utils/index.js'
export default {
  name: 'MainPage',
  components: { HeadTop },
  data() {
    return {
      mode: 'cqzl',
      tabPosition: 'left',
      active: [0, 0],
      activeSlide: 1,
      activeSlideShop: null,
      activeTipsSlide: 0,
      nowWorkshopChildren: [],
      nextClose: null,
      nowWebSide: 'left',
      leftTabsList: [{
        parent: '工厂总览',
        title: '',
        span: '49',
        instructions: '',
        children: [{
          title: '工厂总览',
          type: 'page',
          name: 'cqzl',
          ue_name: '工厂总览',
          isOpen: 'Y',
          children: []
        }]
      }, {
        parent: '工厂总览',
        title: '',
        span: '49',
        instructions: '',
        children: [{
          title: '工厂漫游',
          type: 'page',
          name: 'cqmy',
          ue_name: '工厂漫游',
          isOpen: 'Y',
          children: []
        }]
      }, {
        parent: '工厂总览',
        title: '原煤仓',
        ue_name: '原煤仓',
        span: '49',
        instructions: '',
        children: [{
          title: '1号',
          type: 'page',
          name: 'ymc',
          ue_name: '原煤仓1号',
          isOpen: 'Y',
          children: []
        }, {
          title: '2号',
          type: 'page',
          name: 'ymc',
          ue_name: '原煤仓2号',
          isOpen: 'Y',
          children: []
        }]
      }, {
        parent: '工厂总览',
        title: '末煤车间',
        span: '49',
        instructions: '',
        children: [{
          title: '末煤车间',
          type: 'page',
          name: 'mmcj',
          ue_name: '末煤车间',
          isOpen: 'Y',
          children: []
        }]
      }, {
        parent: '工厂总览',
        title: '原厂房',
        span: '49',
        instructions: '',
        children: [{
          title: '块煤车间',
          type: 'page',
          name: 'ycf',
          ue_name: '块煤车间',
          isOpen: 'Y',
          children: []
        }]
      }, {
        parent: '工厂总览',
        title: '压滤车间',
        span: '49',
        instructions: '',
        children: [{
          title: '压滤车间',
          type: 'page',
          name: 'ylcj',
          ue_name: '压滤车间',
          isOpen: 'Y',
          children: []
        }]
      }, {
        parent: '工厂总览',
        title: '浓缩车间',
        span: '49',
        instructions: '',
        children: [{
          title: '1',
          type: 'page',
          name: 'nscj',
          ue_name: '浓缩车间1',
          isOpen: 'Y',
          children: []
        }, {
          title: '2',
          type: 'page',
          name: 'nscj',
          ue_name: '浓缩车间2',
          isOpen: 'Y',
          children: []
        }, {
          title: '3',
          type: 'page',
          name: 'nscj',
          ue_name: '浓缩车间3',
          isOpen: 'Y',
          children: []
        }, {
          title: '4',
          type: 'page',
          name: 'nscj',
          ue_name: '浓缩车间4',
          isOpen: 'Y',
          children: []
        }]
      }, {
        parent: '工厂总览',
        title: '干燥车间',
        span: '49',
        instructions: '',
        children: [{
          title: '干燥车间',
          type: 'page',
          name: 'gzcj',
          ue_name: '干燥车间',
          isOpen: 'Y',
          children: []
        }]
      }, {
        parent: '工厂总览',
        title: '矸石仓',
        span: '49',
        instructions: '',
        children: [{
          title: '矸石仓',
          type: 'page',
          name: 'gsc',
          ue_name: '矸石仓',
          isOpen: 'Y',
          children: []
        }]
      }, {
        parent: '工厂总览',
        title: '超高压',
        span: '49',
        instructions: '',
        children: [{
          title: '超高压滤车间',
          type: 'page',
          name: 'cgylcj',
          ue_name: '超高压滤车间',
          isOpen: 'Y',
          children: []
        }]
      }, {
        parent: '工厂总览',
        title: '干煤泥棚',
        span: '49',
        instructions: '',
        children: [{
          title: '干煤泥棚',
          type: 'page',
          name: 'gmnp',
          ue_name: '干煤泥棚',
          isOpen: 'Y',
          children: []
        }]
      }, {
        parent: '工厂总览',
        title: '精煤干燥车间',
        span: '49',
        instructions: '',
        children: [{
          title: '精煤干燥车间',
          type: 'page',
          name: 'jmgzcj',
          ue_name: '精煤干燥车间',
          isOpen: 'Y',
          children: []
        }]
      }, {
        parent: '工厂总览',
        title: '成品仓',
        span: '49',
        instructions: '',
        children: [{
          title: '1号',
          type: 'page',
          name: 'cpc',
          ue_name: '成品仓1',
          isOpen: 'Y',
          children: []
        }, {
          title: '2号',
          type: 'page',
          name: 'cpc',
          ue_name: '成品仓2',
          isOpen: 'Y',
          instructions: [0, 36],
          children: []
        }, {
          title: '3号',
          type: 'page',
          name: 'cpc',
          ue_name: '成品仓3',
          isOpen: 'Y',
          children: []
        }]
      }],
      rightTabsList: [{
        parent: '车间内部',
        title: '',
        span: '100',
        children: [{
          title: '末煤车间',
          children: [{
            title: '3205',
            type: 'tips',
            name: 'mmcj',
            ue_name: '3205',
            isOpen: 'Y',
          }, {
            title: '3207',
            type: 'tips',
            name: 'mmcj',
            ue_name: '3207',
            isOpen: 'Y',
          }, {
            title: '3209',
            type: 'tips',
            name: 'mmcj',
            ue_name: '3209',
            isOpen: 'Y',
          }, {
            title: '3211',
            type: 'tips',
            name: 'mmcj',
            ue_name: '3211',
            isOpen: 'Y',
          }, {
            title: '3213',
            type: 'tips',
            name: 'mmcj',
            ue_name: '3213',
            isOpen: 'Y',
          },{
            title: '3215',
            type: 'tips',
            name: 'mmcj',
            ue_name: '3215',
            isOpen: 'Y',
          }, {
            title: '3217',
            type: 'tips',
            name: 'mmcj',
            ue_name: '3217',
            isOpen: 'Y',
          }, {
            title: '3220',
            type: 'tips',
            name: 'mmcj',
            ue_name: '3220',
            isOpen: 'Y',
          }, {
            title: '3227',
            type: 'tips',
            name: 'mmcj',
            ue_name: '3227',
            isOpen: 'Y',
          }, {
            title: '3229',
            type: 'tips',
            name: 'mmcj',
            ue_name: '3229',
            isOpen: 'Y',
          }, {
            title: '3235',
            type: 'tips',
            name: 'mmcj',
            ue_name: '3235',
            isOpen: 'Y',
          }, {
            title: '3237',
            type: 'tips',
            name: 'mmcj',
            ue_name: '3237',
            isOpen: 'Y',
          }, {
            title: '3240',
            type: 'tips',
            name: 'mmcj',
            ue_name: '3240',
            isOpen: 'Y',
          }, {
            title: '3242',
            type: 'tips',
            name: 'mmcj',
            ue_name: '3242',
            isOpen: 'Y',
          }, {
            title: '3206',
            type: 'tips',
            name: 'mmcj',
            ue_name: '3206',
            isOpen: 'Y',
          }, {
            title: '3208',
            type: 'tips',
            name: 'mmcj',
            ue_name: '3208',
            isOpen: 'Y',
          }, {
            title: '3210',
            type: 'tips',
            name: 'mmcj',
            ue_name: '3210',
            isOpen: 'Y',
          }, {
            title: '3212',
            type: 'tips',
            name: 'mmcj',
            ue_name: '3212',
            isOpen: 'Y',
          }, {
            title: '3214',
            type: 'tips',
            name: 'mmcj',
            ue_name: '3214',
            isOpen: 'Y',
          }, {
            title: '3216',
            type: 'tips',
            name: 'mmcj',
            ue_name: '3216',
            isOpen: 'Y',
          }, {
            title: '3219',
            type: 'tips',
            name: 'mmcj',
            ue_name: '3219',
            isOpen: 'Y',
          }, {
            title: '3225',
            type: 'tips',
            name: 'mmcj',
            ue_name: '3225',
            isOpen: 'Y',
          }, {
            title: '3228',
            type: 'tips',
            name: 'mmcj',
            ue_name: '3228',
            isOpen: 'Y',
          }, {
            title: '3230',
            type: 'tips',
            name: 'mmcj',
            ue_name: '3230',
            isOpen: 'Y',
          }, {
            title: '3236',
            type: 'tips',
            name: 'mmcj',
            ue_name: '3236',
            isOpen: 'Y',
          }, {
            title: '3239',
            type: 'tips',
            name: 'mmcj',
            ue_name: '3239',
            isOpen: 'Y',
          }, {
            title: '3241',
            type: 'tips',
            name: 'mmcj',
            ue_name: '3241',
            isOpen: 'Y',
          }]
        }]
      }, {
        parent: '车间内部',
        title: '',
        span: '100',
        instructions: '',
        children: [{
          title: '压滤车间',
          children: [{
            title: '343',
            type: 'tips',
            name: 'ylcj',
            ue_name: '343',
            isOpen: 'Y',
          }, {
            title: '345',
            ue_name: '345',
            type: 'tips',
            name: 'ylcj',
            isOpen: 'Y',
          }, {
            title: '601',
            ue_name: '601',
            type: 'tips',
            name: 'ylcj',
            isOpen: 'Y',
          }, {
            title: '5201',
            ue_name: '5201',
            type: 'tips',
            name: 'ylcj',
            isOpen: 'Y',
          }, {
            title: '6208',
            ue_name: '6208',
            type: 'tips',
            name: 'ylcj',
            isOpen: 'Y',
          }, {
            title: '6210',
            ue_name: '6210',
            type: 'tips',
            name: 'ylcj',
            isOpen: 'Y',
          }, {
            title: '6212',
            ue_name: '6212',
            type: 'tips',
            name: 'ylcj',
            isOpen: 'Y',
          }, {
            title: '6214',
            ue_name: '6214',
            type: 'tips',
            name: 'ylcj',
            isOpen: 'Y',
          }, {
            title: '6216',
            ue_name: '6216',
            type: 'tips',
            name: 'ylcj',
            isOpen: 'Y',
          }, {
            title: '6218',
            ue_name: '6218',
            type: 'tips',
            name: 'ylcj',
            isOpen: 'Y',
          }, {
            title: '6220',
            ue_name: '6220',
            name: 'ylcj',
            type: 'tips',
            isOpen: 'Y',
          }, {
            title: '346',
            ue_name: '346',
            type: 'tips',
            name: 'ylcj',
            isOpen: 'Y',
          }, {
            title: '602',
            ue_name: '602',
            name: 'ylcj',
            type: 'tips',
            isOpen: 'Y',
          }, {
            title: '5201',
            ue_name: '5201',
            type: 'tips',
            name: 'ylcj',
            isOpen: 'Y',
          }, {
            title: '5202',
            ue_name: '5202',
            name: 'ylcj',
            type: 'tips',
            isOpen: 'Y',
          }, {
            title: '6209',
            ue_name: '6209',
            type: 'tips',
            name: 'ylcj',
            isOpen: 'Y',
          }, {
            title: '6211',
            ue_name: '6211',
            name: 'ylcj',
            type: 'tips',
            isOpen: 'Y',
          }, {
            title: '6213',
            ue_name: '6213',
            type: 'tips',
            name: 'ylcj',
            isOpen: 'Y',
          }, {
            title: '6215',
            ue_name: '6215',
            name: 'ylcj',
            type: 'tips',
            isOpen: 'Y',
          }, {
            title: '6217',
            ue_name: '6217',
            type: 'tips',
            name: 'ylcj',
            isOpen: 'Y',
          }, {
            title: '6219',
            ue_name: '6219',
            name: 'ylcj',
            type: 'tips',
            isOpen: 'Y',
          }, {
            title: '6220',
            ue_name: '6220',
            name: 'ylcj',
            type: 'tips',
            isOpen: 'Y',
          }]
        }]
      }, {
        parent: '车间内部',
        title: '',
        span: '100',
        instructions: '',
        children: [{
          title: '超高压滤车间',
          children: [{
            title: '601',
            ue_name: '601',
            type: 'tips',
            name: 'cgylcj',
            isOpen: 'Y',
          }, {
            title: '5202',
            ue_name: '5202',
            name: 'cgylcj',
            type: 'tips',
            isOpen: 'Y',
          }, {
            title: '8521',
            ue_name: '8521',
            name: 'cgylcj',
            type: 'tips',
            isOpen: 'Y',
          }, {
            title: '8523',
            ue_name: '8523',
            name: 'cgylcj',
            type: 'tips',
            isOpen: 'Y',
          }, {
            title: '8525',
            ue_name: '8525',
            name: 'cgylcj',
            type: 'tips',
            isOpen: 'Y',
          }, {
            title: '8530',
            ue_name: '8530',
            name: 'cgylcj',
            type: 'tips',
            isOpen: 'Y',
          }, {
            title: '8532',
            ue_name: '8532',
            name: 'cgylcj',
            type: 'tips',
            isOpen: 'Y',
          }, {
            title: '8554',
            ue_name: '8554',
            name: 'cgylcj',
            type: 'tips',
            isOpen: 'Y',
          }, {
            title: '602',
            ue_name: '602',
            name: 'cgylcj',
            type: 'tips',
            isOpen: 'Y',
          }, {
            title: '5210',
            ue_name: '5210',
            name: 'cgylcj',
            type: 'tips',
            isOpen: 'Y',
          }, {
            title: '8522',
            ue_name: '8522',
            name: 'cgylcj',
            type: 'tips',
            isOpen: 'Y',
          }, {
            title: '8524',
            ue_name: '8524',
            name: 'cgylcj',
            type: 'tips',
            isOpen: 'Y',
          }, {
            title: '8526',
            ue_name: '8526',
            name: 'cgylcj',
            type: 'tips',
            isOpen: 'Y',
          }, {
            title: '8531',
            ue_name: '8531',
            name: 'cgylcj',
            type: 'tips',
            isOpen: 'Y',
          }, {
            title: '8551',
            ue_name: '8551',
            name: 'cgylcj',
            type: 'tips',
            isOpen: 'Y',
          }]
        }]
      }]
    }
  },
  created() {
    const loading = this.$loading({
      fullscreen: true,
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    });
    setTimeout(() => {
      loading.close();
    }, 2000);
  },
  mounted() {
    this.nowWorkshopChildren = this.leftTabsList[0].children[0].children
  },
  computed: {
    isActive() {
      return function (i, c) {
        return JSON.stringify(this.active) === JSON.stringify([i, c])
      }
    },
    columnSpan() {
      return function (span) {
        return `width: ${span}%`
      }
    }
  },
  methods: {
    resetTab(inx) {
      this.active = [0, 0]
      let info = {}
      let send_info = {}
      switch (inx) {
        case '0':
          this.activeSlide = 1
          this.nowWorkshopChildren = this.leftTabsList[0].children[0].children
          info = this.leftTabsList[0].children[0]
          send_info = fixedInfo(info, this.nextClose)
          this.$socket.send(send_info)
          break
        case '1':
          this.nowWorkshopChildren = this.rightTabsList[0].children[0].children
          info = this.rightTabsList[0].children[0].children[0]
          send_info = fixedInfo(info, this.nextClose)
          this.$socket.send(send_info)
          this.activeSlideShop = null
      }
    },
    handleChangeTab(tab) {
      this.resetTab(tab.index)
    },
    handleLogout() {
      this._logout((url) => {
        // 登出之前可以做一些操作
        location.href = url;
      })
    },
    // -------- 工厂总览 --------
    // 左侧点击
    handleWorkshop: throttle(function (c, i_inx, c_inx) {
      if(c.isOpen !== 'N') {
        const send_info = fixedInfo(c, this.nextClose)
        console.log('>>>send_info', send_info)
        this.$socket.send(send_info)
        this.active = [i_inx, c_inx]
        this.nowWorkshopChildren = c.children
        this.activeSlide = null
        this.nextClose = c.close_sand_table_instructions
      }
    }, 500),
    // 右侧点击
    handleMode: throttle(function (x, x_inx) {
      this.nowWebSide = x.webSide
      // 工厂总览设备切换沙盘无状态切换
      const send_info = fixedInfo(x, null)
      if(send_info.title === '是否显示车间名称') {
        send_info.webSide = this.nowWebSide
      }
      console.log('>>>send_info', send_info)
      this.$socket.send(send_info)
      this.activeSlide = x_inx
    }, 500),
    handleTips: throttle(function (x, x_inx) {
      x.webSide = this.nowWebSide
      // tips的显隐
      const send_info = fixedInfo(x, null)
      console.log('>>>send_info', send_info)
      this.$socket.send(send_info)
      this.activeTipsSlide = x_inx
    }, 500),
    // -------- 车间内部 --------
    // 左侧点击
    handleProductionWorkshop: throttle(function (c, i_inx, c_inx) {
      
      console.log('>>>send_info---c', c, c.children, i_inx, c_inx)
      const shop = c.children[0]
      const send_info = fixedInfo(shop, this.nextClose)
      console.log('>>>send_info---send_info', send_info)
      this.$socket.send(send_info)
      this.active = [i_inx, c_inx]
      this.nowWorkshopChildren = c.children
      this.nextClose = shop.close_sand_table_instructions
      this.activeSlideShop = null
    }, 500),
    // 右侧点击
    handleProductionMode: throttle(function (x, x_inx) {
      if(x.isOpen !== 'N') {
        const send_info = fixedInfo(x, this.nextClose)
        console.log('>>>send_info', send_info)
        this.$socket.send(send_info)
        this.activeSlideShop = x_inx
        this.nextClose = x.close_sand_table_instructions
      }
    }, 500),
  }

}
</script>
<style lang="less" scoped>
.bg {
  background: url('../assets/bg.png');
  background-size: 100% 100%;
  background-position: center center;
  background-repeat: no-repeat;
  height: 100vh; /* 视口高度 */
  width: 100vw; /* 视口宽度 */
  margin: 0; /* 确保没有额外的边距 */
  padding: 0; /* 确保没有额外的内边距 */
}
.logout {
  color: #FFFFFF;
  opacity: 0.6;
  width: 100%;
  text-align: center;
  margin-top: 50px;
  padding-bottom: 30px;
}

.tabs {
  margin: 32px 0
}

.el-tabs {
  color: #fff;
}

.workshop-switch {
  padding: 21px 24px;
  overflow-y: scroll;
  color: rgba(255, 255, 255, 0.8);
  flex-wrap: wrap;
  justify-content: space-between;

  .workshop-wrap {
    margin-right: 0;

    .title {
      font-size: 14px;
      margin-bottom: 8px;
    }
  }

  .workshop-container {
    display: flex;
    justify-content: space-evenly;
    font-size: 16px;
    margin-bottom: 20px;

    .workshop {
      width: 100%;
      border: 1px solid rgb(58, 58, 58);
      padding: 10px 0;
      text-align: center;
      margin-right: 8px;
      background: rgba(255, 255, 255, 0.03);
      cursor: pointer;
    }

    .workshop-active {
      color: #4EDCCA;
      border: 1px solid #4EDCCA;
    }

    .workshop:last-child {
      margin-right: 0;
    }

    .disable {
      color: rgba(255, 255, 255, 0.2);
      pointer-events: none;
    }
  }
}

.line {
  width: 1px;
  background: rgba(255, 255, 255, 0.1);
  height: 80vh;
  margin-left: 4px;
}

.equipment-switch {
  overflow-y: scroll;
  color: rgba(255, 255, 255, 0.8);
  padding: 21px;
  height: 80vh; /* 添加高度限制 */
  /* 或者使用 max-height: 80vh; */
}

.mode {
    width: 100%;
    padding: 10px 0;
    text-align: center;
    border: 1px solid rgb(58, 58, 58);
    margin-bottom: 8px;
    background: rgba(255, 255, 255, 0.03);
    cursor: pointer;
  }

.tabs-left {
  display: flex;

  .workshop-switch {
    flex: 5;
    display: flex;
    height: 80vh;
  }

  .equipment-switch {
    flex: 3;
    height: 80vh; /* 添加高度限制 */
    overflow-y: scroll; /* 确保滚动生效 */
  }
}

.tabs-right {
  display: flex;

  .workshop-switch {
    flex: 3;
  }

  .equipment-switch {
    flex: 5;
    height: 80vh;
    overflow-y: scroll;
    display: grid;
    grid-template-columns: 1fr 1fr; /* 两列等宽 */
    gap: 8px; /* 列间距 */
    align-content: start; /* 从顶部开始排列 */
  }
}

/* 重置 mode 元素的样式 */
.tabs-right .equipment-switch .mode {
  width: 100%;
  margin-right: 0;
  margin-bottom: 8px;
}

/* 判断ipad */
@media only screen and (min-device-width : 768px) {

  .logout-btn {
    width: 120px;
    margin: auto;
    display: flex;
    cursor: pointer;
  }

  .icon {
    width: 30px;
    height: 30px;
    position: relative;


    img {
      width: 21px;
      height: auto;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -9px;
      /* 高度的一半*/
      margin-left: -10px;
      /* 宽度的一半*/
    }
  }

  .tip {
    // width: 80px;
    height: 30px;

    font-weight: 400;
    font-size: 20px;
    line-height: 150%;
  }
}

@media only screen and (min-device-width : 320px) and (max-device-width : 767px) {
  .logout-btn {
    width: 66px;
    margin: auto;
    display: flex;
    cursor: pointer;
  }

  .icon {
    width: 13px;
    height: 12px;
    position: relative;


    img {
      width: 13px;
      height: auto;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -2.5px;
      /* 高度的一半*/
      margin-left: -8px;
      /* 宽度的一半*/
    }

  }

  .tip {
    // width: 48px;
    height: 18px;
    font-weight: 400;
    font-size: 12px;
    line-height: 150%;
  }
}

:deep(.el-tabs__item) {
  font-size: 20px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 28px;
}

:deep(.el-tabs__item:hover) {
  font-weight: 600;
  color: rgba(255, 255, 255, 1);
  text-shadow: 0px 0px 9px rgba(78, 220, 202, 1);
  line-height: 28px;
}

:deep(.el-tabs__item.is-active) {
  font-weight: 600;
  color: rgba(255, 255, 255, 1);
  text-shadow: 0px 0px 9px rgba(78, 220, 202, 1);
  line-height: 28px;
}

:deep(.el-tabs__nav-wrap::after) {
  border: 1px solid rgba(255, 255, 255, 0.1);
  background-color: unset
}

:deep(.el-tabs__active-bar) {
  background-color: #4EDCCA;
}

:deep(.el-tabs__nav-scroll) {
  padding: 0 24px;
}

:deep(.el-tabs__header) {
  margin: 0 15px;
}
</style>
