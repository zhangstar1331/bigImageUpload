//常用功能
const fs = require('fs')
const fse = require('fs-extra')
const path = require('path')
const pump = require('mz-modules/pump')
const BaseController = require('./base')
/**
 * @Controller 常用方法
 */
class UtilController extends BaseController {
    /**
     * @summary 文件上传
     * @description 文件上传
     * @router post /uploadFile
     * @resuest body 
     * @response 200
     */
    async uploadFile(){
        if(Math.random()>0.9){
            return this.ctx.status = 500
        }
        const {ctx} = this
        //切片上传
        const file = ctx.request.files[0]
        const {hash,name} = ctx.request.body
        const chunkPath = path.resolve(this.config.UPLOAD_DIR,hash)
        if(!fse.existsSync(chunkPath)){
            //创建目录
            await fse.mkdir(chunkPath)
        }
        //将文件移入目录
        await fse.move(file.filepath,`${chunkPath}/${name}`)
        this.message('切片上传成功')
        //整体上传
        // const stream = await this.ctx.getFileStream();
        // const filename = encodeURIComponent(stream.fields.name) + path.extname(stream.filename).toLowerCase();
        // const target = path.join(this.config.baseDir, 'app/public', filename);
        // const writeStream = fs.createWriteStream(target);
        // await pump(stream,writeStream)
        // this.message("上传成功")
    }
    /**
     * @summary 切片整合
     * @description 切片整合
     * @router post /mergeFile
     * @resuest body 
     * @response 200
     */
    async mergeFile(){
        const {ext,size,hash} = this.ctx.request.body
        const filePath = path.resolve(this.config.UPLOAD_DIR,`${hash}.${ext}`)
        await this.ctx.service.tools.mergeFile(filePath,hash,size)
        this.success({
            url:`/public/${hash}.${ext}`
        })
    }
    /**
     * @summary 判断切片是否存在
     * @description 判断切片是否存在
     * @router post /checkFile
     * @resuest body 
     * @response 200
     */
    async checkFile(){
        const {ext,hash} = this.ctx.request.body
        const filePath = path.resolve(this.config.UPLOAD_DIR,`${hash}.${ext}`)
        let uploaded = false
        let uploadedList = []
        if(fse.existsSync(filePath)){
            //文件存在
            uploaded = true
        }else{
            uploadedList = await this.getUploadedList(path.resolve(this.config.UPLOAD_DIR,hash))
        }
        this.success({
            uploaded,
            uploadedList
        })
    }
    async getUploadedList(dirPath){
        return fse.existsSync(dirPath)
            ?(await fse.readdir(dirPath)).filter(name=>name[0]!=='.')
            :[]
    }
}
module.exports = UtilController