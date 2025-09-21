<template>
  <div class="headStyle">
    <img src="../assets/ipad-head.png" />
  </div>
</template>

<script>
export default {
  name: 'HeadTop'
}
</script>

<style scoped lang="less">
  .headStyle {
    position: relative;
    
      img {
        max-width: 100%;
        height: auto;
      }
      .logout-btn {
            width: 20px;
            height: 20px;
            position: absolute;
            background-size: 100%;
            background-image: url('@/assets/logout.png');
            right: 10px;
            top: 10px;
      }
      .logout-icon {
        width: 3%;
        height: auto;
        position: absolute;
        right: 10px;
        top: 10%
      }
  }
/* 判断ipad */
// @media only screen
// and (min-device-width : 768px)
// and (max-device-width : 1024px){
//     .headStyle {
//         width: 834px;
//         height: 85px;
//         background-size: cover;
//         background-image: url('@/assets/ipad-head.png');
//     }
// }

// @media only screen 
// and (min-device-width : 320px) 
// and (max-device-width : 767px) {
//     .headStyle {
//         width: 750px;
//         height: 94px;
//         background-size: cover;
//         background-image: url('@/assets/phone-head.png');
//     }
// }
</style>