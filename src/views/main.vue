<template>
    <div id="container">
        <div class="top">
            <div class="left"></div>
            <div class="right">
                <el-dropdown @command="handleCommand">
                    <span class="el-dropdown-link">
                        <i class="el-icon-user-solid"></i>
                        {{info.userName}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item command="pwd">修改密码</el-dropdown-item>
                            <el-dropdown-item divided command='logout'>退出登陆</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
                <el-link :underline="false" class="msg"><i class="el-icon-message-solid"></i>消息</el-link>
            </div>
        </div>
        <div class="wrap">
            <div class="left">
                <ul class="menu">
                    <li v-for="(item, index) in module" v-bind:key="index" v-on:click="addClass(index, 0)" v-bind:class="{ current: index == mid }"><i :class="item.icon"></i>{{ item.name }}</li>
                </ul>
                <ul class="sub-menu" v-if="mid==0?false:true">
                    <template>
                        <li class="line">
                            <b>{{ module[mid].name }}</b>
                        </li>
                        <li v-for="(item, index) in module[mid].children" v-bind:key="index" v-on:click="addClass(index, 1, item)" v-bind:class="{ current: index == mid2 }">{{ item.name }}</li>
                    </template>
                </ul>
            </div>
            <div class="right">
                <keep-alive></keep-alive>
                <router-view />
            </div>
        </div>
    </div>
</template>

<script>
import axios from "@/api/axios"

export default {
	data() {
		return {
			mid: 0,
			mid2: -1,
			module: [],
			info: { id: 0, userName: "" }
		}
	},
	mounted() {
		let path = "/console"
		if (this.$route.path !== path) this.$router.push(path)

		const that = this
		axios.get("/api/admin/module").then((res) => {
			if (res.errCode == 0) {
				that.module = res.data
			}
		})

		axios.get("/api/admin/info").then((res) => {
			if (res.errCode == 0) {
				that.info = res.data
			}
		})
	},
	methods: {
		addClass(index, i, e) {
			if (i == 0) {
				this.mid = index
				this.mid2 = -1

				if (index == 0) {
					let path = "/console"
					if (this.$route.path !== path) this.$router.push(path)
				}
			} else {
				this.mid2 = index
				let path = e.path
				if (this.$route.path !== path) this.$router.push(path)
			}
		},
		handleCommand(command) {
			const that = this
			switch (command) {
				case "pwd":
					that.$router.push("/setting/pwd")
					break
				case "logout":
					axios.get("/api/logout").then((res) => {
						if (res.errCode == 0) {
							that.$router.push("/login")
						}
					})
					break
			}
		}
	}
}
</script>

<style scoped>
.el-dropdown-link {
	cursor: pointer;
	color: #409eff;
}

.el-icon-arrow-down {
	font-size: 12px;
}
#container {
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	min-height: 100%;
	background: #f5f5f5;
	position: relative;
}
.top {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	height: 70px;
	background: #fff;
	color: #666;
}
.top .right {
	display: flex;
	flex-direction: row;
	padding-right: 15px;
}
.top .msg {
	margin-left: 15px;
}
.wrap {
	display: flex;
	flex-direction: row;
	width: 100%;
	position: absolute;
	top: 70px;
	bottom: 0;
}
.wrap .left {
	height: 100%;
	display: flex;
	flex-direction: row;
}
.wrap .menu {
	height: 100%;
	width: 120px;
	background: rgb(25, 33, 43);
}
.wrap .menu li {
	font-size: 16px;
	color: #fff;
	text-align: center;
	padding: 12px;
	cursor: pointer;
}
.wrap .menu li:hover {
	background: rgb(102, 102, 102);
}
.wrap .menu li.current {
	background: rgb(37, 93, 255);
}
.wrap .menu i {
	color: #fff;
	margin-right: 10px;
}
.wrap .sub-menu {
	display: flex;
	flex-direction: column;
	background: #ffffff;
	width: 120px;
}
.wrap .sub-menu li {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 12px;
	cursor: pointer;
	font-size: 14px;
	color: #666;
}
.wrap .sub-menu li.line {
	border-bottom: 1px solid #efefef;
	cursor: auto;
}
.wrap .sub-menu li:hover {
	color: #409eff;
}
.wrap .sub-menu li.current {
	color: #409eff;
	background: #f2f2f2;
}
.wrap .right {
	width: 100%;
	background: #fff;
	margin: 15px;
	padding: 10px;
	overflow-y: scroll;
}
</style>
