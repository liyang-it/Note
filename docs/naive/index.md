---
title: NaiveUI
titleTemplate: 笔记
---

### 按钮测试 <n-button type="primary" @click="handle">Click me!</n-button>

### 表格

<n-data-table
    :columns="columns"
    :data="data"
    :pagination="pagination"
    :bordered="false"
  />

### 轮播图

  <n-carousel autoplay>
    <img
      class="carousel-img"
      src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg"
    >
    <img
      class="carousel-img"
      src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg"
    >
    <img
      class="carousel-img"
      src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg"
    >
    <img
      class="carousel-img"
      src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg"
    >
  </n-carousel>

<script setup>
import { NButton, NDataTable, NCarousel  } from 'naive-ui'
import {ref} from 'vue'

const pagination = ref(false)

const columns = [
    {
      title: "No",
      key: "no"
    },
    {
      title: "Title",
      key: "title"
    },
    {
      title: "Length",
      key: "length"
    }
  ]

const data = [
  { no: 3, title: "Wonderwall", length: "4:18" },
  { no: 4, title: "Don't Look Back in Anger", length: "4:48" },
  { no: 12, title: "Champagne Supernova", length: "7:27" }
];

function handle(){
  alert(1)
}
</script>

<style scoped>
.carousel-img {
  width: 100%;
  height: 240px;
  object-fit: cover;
}
</style>
