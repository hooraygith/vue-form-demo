<template>
    <div :class="s.bind">
        <p :class="s.tip"><i>*</i>客户报备成功后将成为您的意向客户</p>
        <div :class="s.form">
            <div :class="s.form_item">
                <label :class="[s.form_label, s.required]">客户名称</label>
                <div :class="s.form_input">
                    <input type="text" placeholder="请输入" v-validate="'required|name'" name="客户名称" data-vv-validate-on="blur" v-model="model.customer_name">
                    <span :class="s.form_error" v-show="errors.has('客户名称')">{{errors.first('客户名称')}}</span>
                </div>

                <test>
                    <input type="text" placeholder="请输入" v-validate="'required|name'" name="客户名称1" data-vv-validate-on="blur" v-model="test1">
                    <span :class="s.form_error" v-show="errors.has('客户名称1')">{{errors.first('客户名称1')}}</span>
                </test>
            </div>
            <div :class="s.form_item">
                <label :class="s.form_label">企业识别码</label>
                <div :class="s.form_input">
                    <input type="text" placeholder="请输入" v-model="model.company_no">
                </div>
            </div>
            <div :class="s.form_item">
                <label :class="[s.form_label, s.min]">备注</label>
                <div :class="[s.form_input, s.max]">
                    <input type="text" placeholder="请输入" v-model="model.remark">
                </div>
            </div>
            <div :class="[s.form_item,s.attachment]">
                <label :class="[s.form_label, s.min]">
                    附件
                </label>
                <div :class="[s.form_input, s.max]">
                    <input style="font-size:12px" type="text" readonly placeholder="(您可以上传联系人名片和沟通记录照片)">
                </div>
            </div>
            <div :class="s.attachment">
                <div>
                    <attachment :list="attachList" :max-file-num="2"></attachment>
                </div>
            </div>
        </div>
        <div :class="s.actions">
            <mt-button type="primary" size="large" @click="submit">提交</mt-button>
        </div>


        <form data-vv-scope="name1">

            <vue-form rate="2:6" scope="name">

                <!-- label-full 标识label单独占一行，设置了 label-full，rate就无效 -->
                <!-- rate 表示 label 和 input 在同一行时，宽度的比例 -->
                <!-- form-item 的 rate 可以覆盖 vue-form 的 rate -->
                <form-item label="联系人手机号" rate="1:1" :label-full="true" propModel="aa" v-validate="'required|name|min:6'">
                    <input type="mobile" placeholder="请输入1" v-validate="'required|name'" name="联系人姓名1" data-vv-validate-on="blur" v-model="test1">
                </form-item>


                <!-- 自己设置label样式的输入框 -->
                <form-item>
                    <span slot="label">联系人手机号11</span>

                    <!-- va-label 是报错的字段名，默认报错的字段名是父级 form-item 的label，当父级 form-item 没有label时，请设置 va-label -->
                    <input type="mobile" placeholder="请输入2" v-validate="'required|name'" name="联系人姓名2" data-vv-validate-on="blur" v-model="test2">
                </form-item>

                <!-- 最简单的不需要验证的输入框 -->
                <form-item label="联系人手机号">
                    <div class="aa">
                        <div class="bb">
                            <input type="mobile" placeholder="请输入3" name="联系人姓名3" v-model="test3">
                        </div>
                    </div>
                </form-item>
            </vue-form>
        </form>
    </div>
</template>
<script>
import attachment from 'component/attachment.vue'
import vueForm from './vue-form.vue'
import formItem from './form-item.vue'
import test from './test.vue'
export default {
    components: { attachment, vueForm, formItem, test },
    data() {
        return {
            model: {
                company_no: '',
                contact_mobile: '',
                contact_name: '',
                customer_name: '',
                remark: ''
            },
            attachList: [],
            test1: '',
            test2: '',
            test3: ''
        }
    },
    methods: {
        submit() {
            this.$validator.validateAll()
                .then(async result => {
                    if (result) {
                        try {
                            if (this.attachList.length) {
                                this.model.file1 = this.attachList[0].file_qiniu_url
                                this.model.file2 = this.attachList[1] && this.attachList[1].file_qiniu_url
                            }
                            await Vue.$Api.post('/sales/api/wechat/reported_customer/', this.model)
                            Vue.$Toast('提交成功')
                            setTimeout(() => {
                                this.$router.push({ name: 'listReport' })
                            }, 1000)
                        } catch (e) {
                            console.warn(e)
                            e.errormsg && Vue.$Toast(e.errormsg)
                        }
                    }
                })
        }
    },
    created() {

        setTimeout(() => {
            window.vv = this
        }, 2000)

        console.log(444)

    }
}
</script>
<style module="s">
@import './../static/scss/mixin.scss';
.bind {
    width: 92%;
    margin: 0 auto;
    .tip {
        font-size: 12px;
        color: #80848f;
        padding: 0.4rem 0 0.72rem;
        i {
            color: #ff9900;
        }
    }
    .form_item {
        height: 1.1rem;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        color: #495060;
        border-bottom: 1px solid #e1e6eb;
    }
    .attachment {
        border-bottom: none;
        .form_label {
            &.min {
                width: 10%;
            }
        }
    }
    .form_label {
        width: 30%;
        font-size: 15px;
        line-height: 1em;
        &.required::after {
            position: absolute;
            content: '*';
            color: #ed3f14;
        }
        &.min {
            width: 15%;
        }
    }
    .form_input {
        width: 70%;
        position: relative;
        line-height: 1em;
        &.max {
            width: 85%;
        }

        &>input {
            width: 100%;
            font-size: 14px;
            line-height: 1em;
        }
        .input_checkcode {
            display: flex;
            input {
                width: 64%;
            }
            .getcode {
                width: 36%;
                text-align: center;
                font-size: 12px;
                @include border-h;
            }
        }
    }
    .form_error {
        width: 100%;
        color: #ed3f14;
        position: absolute;
        font-size: 12px;
        line-height: 1em;
    }
    .actions {
        margin-top: 0.6rem;
    }
}
</style>