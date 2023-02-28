export interface ticket_response {
    data: {
        cluster: string,
        password_type: string,
        default_ip: number,
        username: string,
        CSRFPreventionToken: string,
        client_ip: string,
        ticket: string,
        isToWelcom: number
    }
}

/**
 * 1 为启用，0 为关闭
 */
type success_type = 0 | 1;

export interface common_ticket_response {
    success: success_type,
    data: unknown,
    errcode: string,
    errcode_tracing: string
}

export interface ticket_response extends common_ticket_response {
    decrypt_failed: number,
    status: number,
    message: string
}

export interface roles_add_form {
    name: string,
    desc: string,
    privs?: string,
}

export interface roles_delete_form {
    ids: string,
    names: string,
}

export interface roles_update_form {
    roleid: string,
    name?: string,
    desc?: string,
    privs?: string,
}


export interface common_response {
    success: success_type,
    data: unknown,
    message: string,
    status: number
}

// https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html
type ide_type = `ide[${number}]`;
type scsi_type = `scsi[${number}]`;
type net_type = `net[${number}]`;

export interface create_vm_form {
    /**
     * 虚拟机配置文件存放存储位置
     * 调用获取存储信息接口，使用其中 id 字段的值
     */
    cfgstorage: string,
    /**
     * 虚拟机分配内存（MB）
     */
    memory: string,
    /**
     * 虚拟机名字
     */
    name: string,
    /**
     * 虚拟机所在主机
     */
    node: string,
    /**
     * 是否异常重启
     */
    abnormal_recovery?: success_type,
    /**
     * 是否自动启动
     */
    autostart?: success_type,
    /**
     * 使用气泡内存
     */
    balloon_memory?: success_type,
    /**
     * 虚拟机启动方式：硬盘(h)、光驱(c)、网络(n)，启动方式可以按参数组合使用
     */
    boot?: 'cdn' | 'cnd' | 'dcn' | 'dnc' | 'ncd' | 'ndc' | 'dn' | 'nd' | 'nd' | 'c' | 'd' | 'n',
    /**
     * 启动盘 ide[n]
     */
    bootdisk?: string,
    /**
     * 每个插槽的cpu核心数
     */
    cores?: number,
    /**
     * cpu 类型,默认使用 core2duo
     */
    cpu?: 'kvm32' | 'kvm64(,\+vmx)' | 'core2duo' | 'host',
    /**
     * 所处目录的名称或id, 缺省即放在默认目录下
     */
    dir?: string,
    /**
     * 是否禁用 Pause-Loop Exiting
     */
    disable_ple?: success_type,
    /**
     * 是否备份过滤页面文件
     */
    file_filter?: success_type,
    /**
     * 显卡类型, vga 为标准 VGA 显卡; vmware 为 VMWare 兼容显卡;
     */
    graphic_type?: 'vga' | 'vmware' | 'qxl' | 'cirrus',
    /**
     * 虚拟机是否启用 virtio 硬盘
     */
    high_performance_disks?: success_type,
    /**
     * 热拔插, 0 为所有设备均不启用热拔 插，1 为允许虚拟机 cpu 热 拔插，2 为允许虚拟机热拔 插内存，3 为全部允许（有系 统限制，默认关闭）。
     */
    hotplug?: number,
    /**
     * 是否启用大页内存
     */
    hugepage?: success_type,
    /**
     * 磁盘
     * [$storageid]:[$filename] ,[media=cdrom|disk]---- 光驱设置模板 [$storageid]:[$volume],[ format=$format],[cache=d irectsync],[preallocate= off|full],[forecast=disa ble|enable],[cache_size= 256]----新磁盘设置模板 [$storageid]:none,[cache =directsync],[preallocat e=off|full],[copy=$stora geid:/$dir/$filename],[f orecast=disable|enable], [cache_size=256],[storag ename=$storagename]----- ---根据已有磁盘创建虚拟 机模板 storageid 磁盘所在存储 id 或 cdrom 挂载虚拟机镜像 所在存储 id filename 挂载镜像的名称 media 媒介，cd 或磁盘 format 虚拟机格式，默认为 qcow2 cache 缓存类型，固定为 directsync preallocate 是否预分配存 储空间 forecast 是 否 使 用 使 用 FastIO 硬盘（支持的操作系 统：Linux 操作系统需要内 核 版 本 高 于 2.6.18 ， Windows 操作系统需要先安 装虚拟机性能优化工具；不 支持 Windows 2000） cache_size 缓存大小，固定 为 256 dir 路径 filename 文件名 例子： ide2=094678b78828c306bc5 7f3343f840a1b:Red-HatEnterprise6.5x86_64.iso,media=cdro m--------光驱 ide0=35000c50075e94697_2 00bc79328d7:80,format=qc ow2,cache=directsync,pre allocate=off,forecast=en able,cache_size=256----- ---磁盘 vs_vol_rep2:none,cache=d irectsync,preallocate=of f,copy=vs_vol_rep2:backu p/images/1164668111610/v m-disk-1.qcow2.auto180317-202620-16a5de4a9f59-4506-9a1a- cfca7119e6b6.qcow2,forec ast=disable,cache_size=2 56,storagename=虚拟存储 (2 副本卷)----已有磁盘创 建
     */
    [key: ide_type]: string
    /**
     * 物理磁盘
     * [$storageid]:file:[volum e=$volume] storageid 物理磁盘所在存 储 id volume 物理磁盘的容量 例子： scsi[0]=36589cfc0000004f 9e5b79d0d593f6fb0:file:1 00G-----使用物理磁盘
     */
    [key: scsi_type]: string
    /**
     * numa 总开关
     */
    if_numa_on?: string,
    /**
     * Logo id 
     */
    logo?: number,
    /**
     * 虚拟机生命周期
     * -1 为不启用，设置为日期为使用该虚拟机直至指定日期
     */
    lifespan?: string,
    /**
     * 虚拟机使用的鼠标类型
     * 可以设置为 usb 等
     */
    mousetype?: string,
    /**
     * 禁用 kvm 时钟
     */
    no_kvm_clock?: success_type,
    /**
     * 网卡
     * MODEL=XX:XX:XX:XX:XX:XX, [bridge=<dev>],[bridgena me=$name],[port=$port],[ connect=on] MODEL 网卡类型 XX:XX:XX:XX:XX:XX MAC 地 址 bridge 网桥类型（默认为物 理出口设备 id） port 端口 connect 默认为开启 例子： [rtl8139=FE:FC:FE:FD:62: 69,bridge=bvsf557d02,bri dgename=物理出口 1,port=12345678,connect= on]
     */
    [key: net_type]: string,
    /**
     * 是否启用 numa 调度

     */
    numa?: success_type,
    /**
     * 服务器启动后启动
     */
    onboot?: success_type,
    /**
     * 系统类型 
     * 注: wxp 为 windows XP; win7 为 windows 7; win8 为 windows8; l24 为 Linux 2.4 Kernel; l26 为 Linux 3.X/2.6 Kernel; ws 为 Windows Server2003; ws08 为 windows Server2008; w2k 为 Windows 2000;
     */
    ostype?: 'other' | 'other64' | 'wxp' | 'wxp64' | 'win7' | 'win764' | 'win8' | 'win864' | 'l24' | 'l2464' | 'l26' | 'l2664' | 'ws03' | 'ws0364' | 'ws08' | 'ws0864' | 'w2k' | 'ws1264' | 'sslvpn'
    /**
     * 是否为重要虚拟机
     * 0 为不设置为重要虚拟机，1为设置
     */
    schedopt?: success_type,
    /**
     * cpu 插槽数
     */
    sockets?: number,
    /**
     * bios 停留时间
     */
    splash_time?: number,
    /**
     * 使用 uefi bios
     */
    uefi_bios?: success_type,
    /**
     * 启用 uuid
     */
    use_uuid?: success_type,
    /**
     * 块设备准虚拟化
     */
    use_vblk?: 'yes' | 'no',
}

export interface create_vm_cluster_form extends create_vm_form {
    /**
     * 是否启用故障迁移
     * 集群虚拟机可用
     */
    ha_enable?: success_type,
    /**
     * 优先运行主机 位置的 id
     * 集群虚拟机可用
     */
    always_try_host?: string,
}

// use type alias instead of interface here to avoid the 'Index signature is missing in type' error with TypeScript
// https://www.jiyik.com/tm/xwzj/prolan_1282.html
export type query_vm_details_form = {
    /**
     * 用户 id
     */
    log_user?: string,
    /**
     * 云管理工作流 id 
     */
    log_workflow_id?: string,
    /**
     * 用户 id 
     */
    set_org?: string,
    type?: 'vm' | 'vnet',
}

export type delete_vm_form = {
    /**
     * 是否删除磁盘
     */
    diskremain: success_type,
}

export type encrypt_vm_form = {
    /**
     * 磁盘加密算法
     */
    crypto: string,
}