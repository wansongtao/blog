<template>
  <div class="container">
    <div class="focus">
      <div class="animate-content">
        <div class="name">万松涛</div>
        <div class="des">失败并不可怕，害怕失败才真正可怕。</div>
        <el-button type="primary">Enter Blog</el-button>
      </div>
    </div>
    <div class="article">
      <h4>热门文章</h4>
      <div class="divider"></div>
      <p class="para">
        很想给你写封信，告诉你这里的天气，昨夜的那场电影，还有我的心情。
      </p>
      <div class="art-list">
        <div class="list-item">
          <img src="@/assets/images/new1.jpg" alt="封面" />
          <h6>我没胆量犯错，才把一切错过</h6>
          <p class="date">2019年12月28日</p>
          <p class="item-des">
            “要知道，许多在眼前看来天大的事，都不是人生一战，而只是人生一站。”（七堇年语）
          </p>
          <span>+阅读更多</span>
        </div>
        <div class="list-item">
          <img src="@/assets/images/new1.jpg" alt="封面" />
          <h6>我没胆量犯错，才把一切错过</h6>
          <p class="date">2019年12月28日</p>
          <p class="item-des">
            “要知道，许多在眼前看来天大的事，都不是人生一战，而只是人生一站。”（七堇年语）
          </p>
          <span>+阅读更多</span>
        </div>
        <div class="list-item">
          <img src="@/assets/images/new1.jpg" alt="封面" />
          <h6>我没胆量犯错，才把一切错过</h6>
          <p class="date">2019年12月28日</p>
          <p class="item-des">
            “要知道，许多在眼前看来天大的事，都不是人生一战，而只是人生一站。”（七堇年语）
          </p>
          <span>+阅读更多</span>
        </div>
      </div>
    </div>
    <footer class="footer">
      <div class="ft-content">
          <div class="ft-content-item">
              <h6>万松涛</h6>
              <p>失败并不可怕，害怕失败才真正可怕</p>
              <el-button type="primary">Enter Blog</el-button>
          </div>
          <div class="ft-content-item">
              <h6>相关链接</h6>
              <div class="ft-link">
                  <div>博客</div>
                  <div>博客</div>
                  <div>博客</div>
              </div>
          </div>
          <div class="ft-content-item">
              <h6>联系我</h6>
              <div class="about-me">weChat：SpaceX0529</div>
              <div class="about-me">QQ: 2294215581</div>
              <div class="about-me">email: 2294215581@qq.com</div>
          </div>
      </div>
      <div class="beian">
        <a
          target="_blank"
          href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44060502002532"
          style="
            display: inline-block;
            text-decoration: none;
            height: 20px;
            line-height: 20px;
          "
          ><img src="@/assets/images/beian.png" style="float: left" />
          <p
            style="
              float: left;
              height: 20px;
              line-height: 20px;
              margin: 0px 0px 0px 5px;
              color: #939393;
            "
          >
            粤公网安备 44060502002532号
          </p>
        </a>
      </div>
    </footer>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  background: url("../assets/images/bg.jpg") no-repeat center center;
  background-attachment: fixed;
  background-size: cover;
  background-color: transparent;

  .focus {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    background: rgba($color: #000000, $alpha: 0.4);

    .animate-content {
      animation: mainAni 1s linear 0s 1 normal forwards;
    }

    .name {
      padding: 10px;
      font-size: 36px;
      color: #fff;
    }

    .des {
      margin-bottom: 15px;
      padding: 5px;
      font-size: 20px;
      color: #fff;
    }
  }

  .article {
    width: 100%;
    background: #fff;

    h4 {
      font-size: 28px;
      line-height: 40px;
    }

    .divider {
      margin: 0 auto;
      width: 50px;
      height: 2px;
      background: #00c2ff;
      border-radius: 1px;
    }

    .para {
      margin: 10px auto;
      width: 20%;
      text-align: center;
      font-size: 16px;
      line-height: 1.5em;
      color: #888;
    }

    .art-list {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0 auto;
      padding: 10px 0;
      width: 60%;

      .list-item {
        width: 32%;
        background: #faf9f9;
        text-align: left;

        img {
          display: block;
          border: none;
          width: 100%;
        }

        h6 {
          padding: 10px;
          font-size: 14px;
          color: #000;
          font-weight: bold;
        }

        .date {
          padding-left: 10px;
          font-size: 12px;
        }

        .item-des {
          padding: 10px;
          height: 80px;
          font-size: 14px;
          color: #888;
        }

        span {
          padding: 10px;
          cursor: pointer;
          font-size: 14px;
          color: #0000ee;
        }
      }
    }
  }
}

@keyframes mainAni {
  from {
    transform: scale(0.2);
  }
  to {
    transform: scale(1);
  }
}

.footer {
  width: 100%;
  background: #232328;

  .ft-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 30px 5%;
    width: 90%;
  }

  .beian {
    width: 100%;
    padding: 10px 0;
    background: #1d1d21;
    text-align: center;
    font-size: 16px;
  }
}

.ft-content-item {
    flex: 1;
    height: 130px;
    color: #fff;
    text-align: left;

    h6 {
        font-size: 18px;
        line-height: 40px;
    }

    p {
        margin-bottom: 10px;
        font-size: 14px;
        line-height: 30px;
    }
}

.ft-link {
    display: flex;
    flex-wrap: wrap;
    align-content: space-around;
    padding: 10px 0;
    height: 70px;

    div {
        width: 50%;
        font-size: 14px;
        color: #fff;
        cursor: pointer;

        &:hover {
            color: #82b440;
        }
    }
}

.about-me {
    font-size: 14px;
    line-height: 30px;
}
</style>