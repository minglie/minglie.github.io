//20190120

class Github{
    constructor(opts) {
        this.token = opts.token;
        this.options = opts;
        this._apiHost='https://api.github.com';
    }

    utf8_to_b64(str) {
        return window.btoa(unescape(encodeURIComponent(str)));
    }

    b64_to_utf8(str) {
        return decodeURIComponent(escape(window.atob(str)));
    }





    async fetch(opts){
        const { isText,url, ...otherOpts } = opts;
        return  fetch(url, {
                ...otherOpts,
                mode: 'cors'
            }
        ).then((res) => {
            if(isText){
                return res.text();
            }else {
                return res.json();
            }
        });
    }


    /**
     * 个人所有仓库
     */
    async getUser() {
        return this.fetch({
            url: `${this._apiHost}/users/${this.options.username}`
        });
    }

    /**
     * 个人所有仓库
     */
    async reposListAll() {
        return this.fetch({
            url: `${this._apiHost}/users/${this.options.username}/repos`
        });
    }


    /**
     * 仓库详情
     */
    async reposDetails(reposName) {
        return this.fetch({
            url: `${this._apiHost}/repos/${this.options.username}/${reposName}`
        });
    }

    /**
     * repo中所有的commits列表
     * sha="/c15c91a059f7ea83964fda621f8edf990727616e"
     */
    async commitList(reposName,sha="") {
        return this.fetch({
            url: `${this._apiHost}/repos/${this.options.username}/${reposName}/commits${sha}`
        });
    }


    /**
     * issues列表
     * issueNum="/1"
     */
    async issuesList(reposName,issueNum="") {
        return this.fetch({
            url: `${this._apiHost}/repos/${this.options.username}/${reposName}/issues${issueNum}`
        });
    }




    /**
     * 获取某个repo的内容列表,或文件信息
     */
    async reposContents(reposName,path="") {
        return this.fetch({
            url: `${this._apiHost}/repos/${this.options.username}/${reposName}/contents${path}`
        });
    }


    /**
     * 获取某文件的原始内容
     */
    async fileContents(reposName,path="",branch="master") {
        return this.fetch({
            url: `https://raw.githubusercontent.com/${this.options.username}/${reposName}/${branch}${path}`,
            isText:true
        });
    }

    /**
     */
    async test(reposName,path="",branch="master") {
        return this.fetch({
            url: `https://api.github.com/`
        });
    }


    /**
     * 创建新文件 Create content
     */
    async createContent(reposName,path="",content) {
        return this.fetch({
            method:"put",
            url: `https://api.github.com/repos/${this.options.username}/${reposName}/contents${path}?access_token=${this.token}`,
            body: JSON.stringify({
                "message": "commit from INSOMNIA",
                "content":  this.utf8_to_b64(content)
            })
        });
    }

    /**
     * 更新文件 Update content
     */
    async updateContent(reposName,path="",content) {
        let r=await this.reposContents(reposName,path);
        let sha= r.sha;
        let body= JSON.stringify({
            "message": "commit from INSOMNIA",
            "content":  this.utf8_to_b64(content),
            "sha": sha
        });

        return this.fetch({
            method:"put",
            url: `https://api.github.com/repos/${this.options.username}/${reposName}/contents${path}?access_token=${this.token}`,
            body:body
        });
    }


    /**
     * 删除文件 Delete content
     */
    async deleteContent(reposName,path="") {
        let r=await this.reposContents(reposName,path);
        let sha= r.sha;
        return this.fetch({
            method:"delete",
            url: `https://api.github.com/repos/${this.options.username}/${reposName}/contents${path}?access_token=${this.token}`,
            bodt: JSON.stringify({
                "message": "delete a file",
                "sha": sha
            })
        });
    }


    /**
     * 增加一条issue
     */
    async createIssue(reposName,opts={title:"title01","body":"b"}) {
        return this.fetch({
            method:"post",
            url: `https://api.github.com/repos/${this.options.username}/${reposName}/issues?access_token=${this.token}`,
            body:JSON.stringify(opts)
        });
    }

    /**
     * 更改某条issue
     */
    async updateIssue(reposName,issueNum,opts={title:"title01","body":"b","state": "open"}) {
        return this.fetch({
            method:"patch",
            url: `https://api.github.com/repos/${this.options.username}/${reposName}/issues/${issueNum}?access_token=${this.token}`,
            data:JSON.stringify(opts)
        });
    }

    /**
     * 锁住某条issue
     */
    async lockIssue(reposName,issueNum,opts={ "locked": true, "active_lock_reason": "too heated"}) {
        return this.fetch({
            method:"put",
            url: `https://api.github.com/repos/${this.options.username}/${reposName}/issues/${issueNum}/lock?access_token=${this.token}`,
            data:JSON.stringify(opts)
        });
    }
    /**
     * 解锁某条issue
     */
    async unlockIssue(reposName,issueNum) {
        return this.fetch({
            method:"delete",
            url: `https://api.github.com/repos/${this.options.username}/${reposName}/issues/${issueNum}/lock?access_token=${this.token}`,
        });
    }


    /**
     * 增加comment
     */

    async createComment(reposName,issueNum,body) {
        return this.fetch({
            method:"post",
            url: `https://api.github.com/repos/${this.options.username}/${reposName}/issues/${issueNum}/comments?access_token=${this.token}`,
            data:JSON.stringify(body)
        });
    }



    /**
     * 更改comment
     */
    async updateComment(reposName,commentId,body) {
        return this.fetch({
            method:"patch",
            url: `https://api.github.com/repos/${this.options.username}/${reposName}/issues/comments/${commentId}?access_token=${this.token}`,
            data:JSON.stringify(body)
        });
    }

    /**
     * 删除comment
     */
    async deleteComment(reposName,commentId) {
        return this.fetch({
            method:"delete",
            url: `https://api.github.com/repos/${this.options.username}/${reposName}/issues/comments/${commentId}?access_token=${this.token}`
        });
    }







}