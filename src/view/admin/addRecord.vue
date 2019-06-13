<template>
<el-container class="containers">
  
    <el-row>
        <el-col :span="24">
            <div class="grid-content bg-purple-dark">
                <el-header style="font-size: 12px;height:30px">
                    <span>Add new Entity</span>
                </el-header>
            </div>
        </el-col>
    </el-row>
  <div style="margin-left:20px">
    <el-row>
        <el-col :span="12">
            <div class="grid-content bg-purple">
                <el-collapse v-model="activeNames" @change="handleChange" class="Identifiers">
                    <el-collapse-item title="Identifiers" name="1">
                        <div class="name-input">
                            <span>Identifier:</span>
                            <el-input v-model="input" placeholder=""></el-input>
                        </div>
                        <div class="input">
                            <span style="width:200px;margin-right:48px">Identifier Domain:</span>
                            <el-select v-model="value" clearable placeholder="请选择">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <el-table
                            :data="tableData"
                            style="width: 100%"
                            :default-sort = "{prop: 'date', order: 'descending'}"
                            >
                            <el-table-column
                            prop="date"
                            label="data"
                            sortable
                            width="180">
                            </el-table-column>
                            <el-table-column
                            prop="name"
                            label="name"
                            sortable
                            width="180">
                            </el-table-column>
                            <el-table-column
                            prop="address"
                            label="address"
                            :formatter="formatter">
                            </el-table-column>
                        </el-table>
                    </el-collapse-item>
                </el-collapse>
            </div>
        </el-col>
    <!-- <el-col :span="12"><div class="grid-content bg-purple-light"></div></el-col> -->
    </el-row>
  
    <el-row>
        <el-col :span="8" style="margin-right:80px;">
            <div class="grid-content bg-purple">
                <el-collapse v-model="activeNamesLeft" @change="handleChange" class="Identifiers">
                    <el-collapse-item title="Identifiers" name="1">
                        <div class="name-input-Name">
                            <span>
                                Identifier:
                            </span>
                            <el-input v-model="input" placeholder="" class="input-style"></el-input>
                        </div>
                        <div class="name-input-Name">
                            <span>
                                Identifier:
                            </span>
                            <el-input v-model="input" placeholder="" class="input-style"></el-input>
                        </div>
                        <div class="name-input-Name">
                            <span>
                                Identifier:
                            </span>
                            <el-input v-model="input" placeholder=""></el-input>
                        </div>
                        <div class="name-input-Name">
                            <span>
                                Identifier:
                            </span>
                            <el-input v-model="input" placeholder=""></el-input>
                        </div>
                        <div class="name-input-Name">
                            <span>
                                Identifier:
                            </span>
                            <el-input v-model="input" placeholder=""></el-input>
                        </div>
                        <div class="name-input-Name">
                            <span>
                                Identifier:
                            </span>
                            <el-input v-model="input" placeholder=""></el-input>
                        </div>
                        <div class="name-input-Name">
                            <span>
                                Identifier:
                            </span>
                            <el-input v-model="input" placeholder=""></el-input>
                        </div>
                        <div class="name-input-Name">
                            <span>
                                Identifier:
                            </span>
                            <el-input v-model="input" placeholder=""></el-input>
                        </div>                   
                    </el-collapse-item>
                    <el-collapse-item title="Identifiers" name="2">
                        <div class="name-input-Name">
                            <span>
                                Identifier:
                            </span>
                            <el-input v-model="input" placeholder=""></el-input>
                        </div>
                        <div class="name-input-Name">
                            <span>
                                Identifier:
                            </span>
                            <el-input v-model="input" placeholder=""></el-input>
                        </div>
                        <div class="name-input-Name">
                            <span>
                                Identifier:
                            </span>
                            <el-input v-model="input" placeholder=""></el-input>
                        </div>
                        <div class="name-input-Name">
                            <span>
                                Identifier:
                            </span>
                            <el-input v-model="input" placeholder=""></el-input>
                        </div>
                        <div class="name-input-Name">
                            <span>
                                Identifier:
                            </span>
                            <el-input v-model="input" placeholder=""></el-input>
                        </div>
                        <div class="name-input-Name">
                            <span>
                                Identifier:
                            </span>
                            <el-input v-model="input" placeholder=""></el-input>
                        </div>
                        <div class="name-input-Name">
                            <span>
                                Identifier:
                            </span>
                            <el-input v-model="input" placeholder=""></el-input>
                        </div>
                        <div class="name-input-Name">
                            <span>
                                Identifier:
                            </span>
                            <el-input v-model="input" placeholder=""></el-input>
                        </div>                   
                    </el-collapse-item>
                    <el-collapse-item title="Identifiers" name="1">
                        <div class="name-input-Name">
                            <span>
                                Identifier:
                            </span>
                            <el-input v-model="input" placeholder=""></el-input>
                        </div>
                        <div class="name-input-Name">
                            <span>
                                Identifier:
                            </span>
                            <el-input v-model="input" placeholder=""></el-input>
                        </div>
                        <div class="name-input-Name">
                            <span>
                                Identifier:
                            </span>
                            <el-input v-model="input" placeholder=""></el-input>
                        </div>
                        <div class="name-input-Name">
                            <span>
                                Identifier:
                            </span>
                            <el-input v-model="input" placeholder=""></el-input>
                        </div>
                        <div class="name-input-Name">
                            <span>
                                Identifier:
                            </span>
                            <el-input v-model="input" placeholder=""></el-input>
                        </div>
                        <div class="name-input-Name">
                            <span>
                                Identifier:
                            </span>
                            <el-input v-model="input" placeholder=""></el-input>
                        </div>
                        <div class="name-input-Name">
                            <span>
                                Identifier:
                            </span>
                            <el-input v-model="input" placeholder=""></el-input>
                        </div>
                        <div class="name-input-Name">
                            <span>
                                Identifier:
                            </span>
                            <el-input v-model="input" placeholder=""></el-input>
                        </div>                   
                    </el-collapse-item>
                    <el-collapse-item title="Identifiers" name="1">
                        <div class="name-input-Name">
                            <span>
                                Identifier:
                            </span>
                            <el-input v-model="input" placeholder=""></el-input>
                        </div>
                        <div class="name-input-Name">
                            <span>
                                Identifier:
                            </span>
                            <el-input v-model="input" placeholder=""></el-input>
                        </div>
                        <div class="name-input-Name">
                            <span>
                                Identifier:
                            </span>
                            <el-input v-model="input" placeholder=""></el-input>
                        </div>
                        <div class="name-input-Name">
                            <span>
                                Identifier:
                            </span>
                            <el-input v-model="input" placeholder=""></el-input>
                        </div>
                        <div class="name-input-Name">
                            <span>
                                Identifier:
                            </span>
                            <el-input v-model="input" placeholder=""></el-input>
                        </div>
                        <div class="name-input-Name">
                            <span>
                                Identifier:
                            </span>
                            <el-input v-model="input" placeholder=""></el-input>
                        </div>
                        <div class="name-input-Name">
                            <span>
                                Identifier:
                            </span>
                            <el-input v-model="input" placeholder=""></el-input>
                        </div>
                        <div class="name-input-Name">
                            <span>
                                Identifier:
                            </span>
                            <el-input v-model="input" placeholder=""></el-input>
                        </div>                   
                    </el-collapse-item>
                </el-collapse>
            </div>
        </el-col>
        <el-col :span="8">
            <div class="grid-content bg-purple-light">
                <el-collapse v-model="activeNamesRight" @change="handleChange" class="Identifiers">
                    <el-collapse-item title="Identifiers" name="1">
                        <div class="name-input-Name">
                            <span>
                                Identifier:
                            </span>
                            <el-input v-model="input" placeholder=""></el-input>
                        </div>
                        <div class="name-input-Name">
                            <span>
                                Identifier:
                            </span>
                            <el-input v-model="input" placeholder=""></el-input>
                        </div>
                        <div class="name-input-Name">
                            <span>
                                Identifier:
                            </span>
                            <el-input v-model="input" placeholder=""></el-input>
                        </div>
                        <div class="name-input-Name">
                            <span>
                                Identifier:
                            </span>
                            <el-input v-model="input" placeholder=""></el-input>
                        </div>
                        <div class="name-input-Name">
                            <span>
                                Identifier:
                            </span>
                            <el-input v-model="input" placeholder=""></el-input>
                        </div>
                        <div class="name-input-Name">
                            <span>
                                Identifier:
                            </span>
                            <el-input v-model="input" placeholder=""></el-input>
                        </div>
                        <div class="name-input-Name">
                            <span>
                                Identifier:
                            </span>
                            <el-input v-model="input" placeholder=""></el-input>
                        </div>
                        <div class="name-input-Name">
                            <span>
                                Identifier:
                            </span>
                            <el-input v-model="input" placeholder=""></el-input>
                        </div>                   
                    </el-collapse-item>
                    <el-collapse-item title="Identifiers" name="2">
                        <div class="name-input-Name">
                            <span>
                                Identifier:
                            </span>
                            <el-input v-model="input" placeholder=""></el-input>
                        </div>
                        <div class="name-input-Name">
                            <span>
                                Identifier:
                            </span>
                            <el-input v-model="input" placeholder=""></el-input>
                        </div>
                        <div class="name-input-Name">
                            <span>
                                Identifier:
                            </span>
                            <el-input v-model="input" placeholder=""></el-input>
                        </div>
                        <div class="name-input-Name">
                            <span>
                                Identifier:
                            </span>
                            <el-input v-model="input" placeholder=""></el-input>
                        </div>
                        <div class="name-input-Name">
                            <span>
                                Identifier:
                            </span>
                            <el-input v-model="input" placeholder=""></el-input>
                        </div>
                        <div class="name-input-Name">
                            <span>
                                Identifier:
                            </span>
                            <el-input v-model="input" placeholder=""></el-input>
                        </div>
                        <div class="name-input-Name">
                            <span>
                                Identifier:
                            </span>
                            <el-input v-model="input" placeholder=""></el-input>
                        </div>
                        <div class="name-input-Name">
                            <span>
                                Identifier:
                            </span>
                            <el-input v-model="input" placeholder=""></el-input>
                        </div>                   
                    </el-collapse-item>
                    <el-collapse-item title="Identifiers" name="1">
                        <div class="name-input-Name">
                            <span>
                                Identifier:
                            </span>
                            <el-input v-model="input" placeholder=""></el-input>
                        </div>
                        <div class="name-input-Name">
                            <span>
                                Identifier:
                            </span>
                            <el-input v-model="input" placeholder=""></el-input>
                        </div>
                        <div class="name-input-Name">
                            <span>
                                Identifier:
                            </span>
                            <el-input v-model="input" placeholder=""></el-input>
                        </div>
                        <div class="name-input-Name">
                            <span>
                                Identifier:
                            </span>
                            <el-input v-model="input" placeholder=""></el-input>
                        </div>
                        <div class="name-input-Name">
                            <span>
                                Identifier:
                            </span>
                            <el-input v-model="input" placeholder=""></el-input>
                        </div>
                        <div class="name-input-Name">
                            <span>
                                Identifier:
                            </span>
                            <el-input v-model="input" placeholder=""></el-input>
                        </div>
                        <div class="name-input-Name">
                            <span>
                                Identifier:
                            </span>
                            <el-input v-model="input" placeholder=""></el-input>
                        </div>
                        <div class="name-input-Name">
                            <span>
                                Identifier:
                            </span>
                            <el-input v-model="input" placeholder=""></el-input>
                        </div>                   
                    </el-collapse-item>
                    <el-collapse-item title="Identifiers" name="1">
                        <div class="name-input-Name">
                            <span>
                                Identifier:
                            </span>
                            <el-input v-model="input" placeholder=""></el-input>
                        </div>
                        <div class="name-input-Name">
                            <span>
                                Identifier:
                            </span>
                            <el-input v-model="input" placeholder=""></el-input>
                        </div>
                        <div class="name-input-Name">
                            <span>
                                Identifier:
                            </span>
                            <el-input v-model="input" placeholder=""></el-input>
                        </div>
                        <div class="name-input-Name">
                            <span>
                                Identifier:
                            </span>
                            <el-input v-model="input" placeholder=""></el-input>
                        </div>
                        <div class="name-input-Name">
                            <span>
                                Identifier:
                            </span>
                            <el-input v-model="input" placeholder=""></el-input>
                        </div>
                        <div class="name-input-Name">
                            <span>
                                Identifier:
                            </span>
                            <el-input v-model="input" placeholder=""></el-input>
                        </div>
                        <div class="name-input-Name">
                            <span>
                                Identifier:
                            </span>
                            <el-input v-model="input" placeholder="" class="input-style"></el-input>
                        </div>
                        <div class="name-input-Name">
                            <span>
                                Identifier:
                            </span>
                            <el-input v-model="input" placeholder=""></el-input>
                        </div>                   
                    </el-collapse-item>
                </el-collapse>
            </div>
        </el-col>
    </el-row>
  </div>

</el-container>
</template>

<style lang="scss">
.containers{
    height: 500px;
    border: 1px solid #eee;
    margin:10px;
    display: flex;
    flex-direction: column;
    .el-header {
        background-color: #B3C0D1;
        color: #333;
        line-height: 30px;
    }
    .Identifiers-all{
        margin:30px;
        .Identifiers{
            width:500px;
            height: 300px;
            margin-bottom: 40px;
        }
        .Identifiers-down{
            border:1px red solid;
        }
    }
    
  .el-aside {
    color: #333;
  }
}
  .el-row {
    margin-bottom: 40px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
      width:100%;
    background: #99a9bf;
    // background: red;
  }
  .bg-purple {
    background: #d3dce6;
    margin-bottom: 40px;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .name-input{
      display: flex;
      span{
          width:200px;
      }
      el-input{
          width: 200px;
      }
  }
  .name-input-Name{
      display: flex;
      span{
          width:160px;
      }
      .el-input__inner {
            height: 20px;
            width:200px;
            border-radius: 5px;
        }
  }
  .input{
 span{
          width:200px;
      }
  }
  //input 样式
.el-input__inner {
    height: 20px;
    width:300px;
}
//下拉箭头的高度
.el-input__icon{
    line-height: 20px;
    text-align: center;
}
// 下拉箭头在input的位置
.input__suffix {
    text-align: right;
}
.el-collapse-item__header {
    color:rgb(39, 136, 247);
}
</style>

<script>
  export default {
    data() {
      const item = {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      };
      return {
        activeNamesLeft:['1','2','3','4'],
        activeNamesRight:['1','2','3','4'],
        activeNames:['1'],
        tableData: Array(20).fill(item),
        input:'',
        options: [{
            value: '选项1',
            label: '黄金糕'
            }, {
            value: '选项2',
            label: '双皮奶'
            }, {
            value: '选项3',
            label: '蚵仔煎'
            }, {
            value: '选项4',
            label: '龙须面'
            }, {
            value: '选项5',
            label: '北京烤鸭'
        }],
        tableData: [{
            date: '2016-05-02',
            name: 'jinjing',
            address: 'shanghai'
            }, {
            date: '2016-05-04',
            name: 'jinjini',
            address: 'shanghai'
            }, {
            date: '2016-05-01',
            name: 'jinjinij',
            address: 'shangshang'
            }, {
            date: '2016-05-03',
            name: 'jinjign',
            address: 'shanghsnang'
        }],
          value: '',
      }
    }
  };
</script>