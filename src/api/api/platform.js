import request from '../request';

// 分类接口
// 用户列表
export function getUserList(data) {
    return request({
        url: '/user/getUserList',
        method: 'post',
        data
    });

};

// 赛事信息
export function getList(data) {
    return request({
        url: '/match/getList',
        method: 'post',
        data
    });
};

// 赛事详情
export function getDetail(data) {
    return request({
        url: '/match/get',
        method: 'post',
        data
    });
};

// 增加赛事
export function addMatch(data) {
    return request({
        url: '/match/addMatch',
        method: 'post',
        data
    });
};

// 编辑赛事
export function editMatch(data) {
    return request({
        url: '/match/edit',
        method: 'post',
        data
    });
};

// 涨球课程
export function getBallShowList(data) {
    return request({
        url: '/course/getBallShowList',
        method: 'post',
        data
    });
};

// 培训课程列表

export function GetTrainList(data) {
    return request({
        url: '/course/getTrainList',
        method: 'post',
        data
    });
};


// 培训详情
export function getCourseGet(data) {
    return request({
        url: '/course/get',
        method: 'post',
        data
    });
};

// 对账列表
export function getRecordList(data) {
    return request({
        url: '/orders/getRecordList',
        method: 'post',
        data
    });
};

// 删除培训
export function courseEdit(data) {
    return request({
        url: '/course/edit',
        method: 'post',
        data
    });
};

// 获取类别

export function sysDictTypegetTypeList(data) {
    return request({
        url: '/sysDictType/getTypeList',
        method: 'post',
        data
    });
};

// 新增培训
export function addTrain(data) {
    return request({
        url: '/course/addTrain',
        method: 'post',
        data
    });
};

// 获取详情
export function courseGet(data) {
    return request({
        url: '/course/get',
        method: 'post',
        data
    });
};

// 更新课程
export function edit(data) {
    return request({
        url: '/course/edit',
        method: 'post',
        data
    });
};


// 新增课程
export function addBall(data) {
    return request({
        url: '/course/addBall',
        method: 'post',
        data
    });
};


// 获取机构列表
export function mechanismTypeList(data) {
    return request({
        url: '/mechanism/typeList',
        method: 'post',
        data
    });
};


// 删除机构
export function mechanismdelList(data) {
    return request({
        url: '/mechanism/delList',
        method: 'post',
        data
    });
};


// 审核机构
export function mechanismupdateType(data) {
    return request({
        url: '/mechanism/updateType',
        method: 'post',
        data
    });
};

// 更新编辑
export function putAdminInfo(data) {
    return request({
        url: '/config/putAdminInfo',
        method: 'post',
        data
    });
};

// 获取编辑
export function getAdminInfo(data) {
    return request({
        url: 'config/getAdminInfo',
        method: 'post',
        data
    });
};


// 获取权限账号
export function getAdminList(data) {
    return request({
        url: '/user/getAdminList',
        method: 'post',
        data
    });
};

// 编辑权限账号
export function editGL(data) {
    return request({
        url: '/user/editGL',
        method: 'post',
        data
    });
};

// 增加权限账号
export function addGL(data) {
    return request({
        url: '/user/addGL',
        method: 'post',
        data
    });
};

// 增加权限账号
export function sysMenugetList() {
    return request({
        url: 'sysMenu/getList',
        method: 'get',
    });
};


// 增加赛事队伍查询
export function getRanksList(data) {
    return request({
        url: 'match/getRanksList',
        method: 'post',
        data
    });
};

// 增加赛事队伍查询
export function ordersgetList(data) {
    return request({
        url: 'orders/getList',
        method: 'post',
        data
    });
};


// 查询流水
export function getSum(data) {
    return request({
        url: 'orders/getSum',
        method: 'post',
        data
    });
};


// 教练进行
export function getTrainShowList(data) {
    return request({
        url: 'course/getTrainShowList',
        method: 'post',
        data
    });
};


// 获取机构列表
export function getTrainInfoList(data) {
    return request({
        url: 'course/getTrainInfoList',
        method: 'post',
        data
    });
};

// 获取球员详情
export function playergetInfo(data) {
    return request({
        url: '/player/getInfo',
        method: 'post',
        data
    });
};


// 获取教练员详情
export function coachgetMyInfo(data) {
    return request({
        url: '/coach/getMyInfo',
        method: 'post',
        data
    });
};


// 获取教练员详情
export function coachfindList(data) {
    return request({
        url: '/coach/findList',
        method: 'post',
        data
    });
};


// 机构旗下教练
export function getCoachList(data) {
    return request({
        url: 'mechanism/getCoachList',
        method: 'post',
        data
    });
};

// 机构详情
export function mechanismget(data) {
    return request({
        url: 'mechanism/get',
        method: 'post',
        data
    });
};

// 机构下球员列表
export function mechanismfindList(data) {
    return request({
        url: 'mechanism/findList',
        method: 'post',
        data
    });
};

// 增加机构
export function addTrainInfo(data) {
    return request({
        url: 'course/addTrainInfo',
        method: 'post',
        data
    });
};

// 新闻资讯列表
export function informationgetList(data) {
    return request({
        url: 'information/getList',
        method: 'post',
        data
    });
};

// 新闻资讯编辑
export function informationeditOne(data) {
    return request({
        url: 'information/editOne',
        method: 'put',
        data
    });
};

// 新闻资讯编辑
export function informationaddOne(data) {
    return request({
        url: 'information/addOne',
        method: 'post',
        data
    });
};

// 新闻资讯编辑
export function informationgetOne(data) {
    return request({
        url: 'information/getOne',
        method: 'post',
        data
    });
};


// 获取商务合作
export function getBusinessAffairs(data) {
    return request({
        url: '/config/getBusinessAffairs',
        method: 'post',
        data
    });
};


// 提交商务合作
export function putBusinessAffairs(data) {
    return request({
        url: '/config/putBusinessAffairs',
        method: 'post',
        data
    });
};


// 新增字典
export function sysDictTypeadd(data) {
    return request({
        url: '/sysDictType/add',
        method: 'post',
        data
    });
};

// 编辑字典
export function sysDictTypeedit(data) {
    return request({
        url: '/sysDictType/edit',
        method: 'post',
        data
    });
};





