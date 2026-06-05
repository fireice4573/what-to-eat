export const PRESET_RECIPES = [
  // ===== 家常菜 (15道) =====
  {
    id: 'preset-1',
    name: '番茄炒蛋',
    category: '家常菜',
    audience: 'all',
    taste: 'light',
    isSoup: false,
    isVegetarian: false,
    cookTime: 10,
    ingredients: ['番茄 2个', '鸡蛋 3个', '葱', '盐', '糖'],
    steps: [
      '番茄切块，鸡蛋打散加少许盐',
      '热油炒鸡蛋至凝固，盛出备用',
      '锅中再加油，炒番茄至出汁',
      '倒回鸡蛋翻炒，加盐和少许糖调味',
      '撒葱花出锅'
    ]
  },
  {
    id: 'preset-2',
    name: '青椒肉丝',
    category: '家常菜',
    audience: 'adult',
    taste: 'medium',
    isSoup: false,
    isVegetarian: false,
    cookTime: 15,
    ingredients: ['猪里脊 200g', '青椒 2个', '姜', '蒜', '生抽', '料酒', '淀粉'],
    steps: [
      '猪肉切丝，加料酒、生抽、淀粉腌制10分钟',
      '青椒切丝，姜蒜切末',
      '热油滑炒肉丝至变色盛出',
      '爆香姜蒜，下青椒翻炒',
      '倒回肉丝，加生抽翻炒均匀出锅'
    ]
  },
  {
    id: 'preset-3',
    name: '鱼香肉丝',
    category: '家常菜',
    audience: 'adult',
    taste: 'heavy',
    isSoup: false,
    isVegetarian: false,
    cookTime: 20,
    ingredients: ['猪里脊 200g', '木耳', '胡萝卜', '青椒', '郫县豆瓣酱', '葱姜蒜', '醋', '糖', '生抽', '淀粉'],
    steps: [
      '肉切丝腌制，木耳泡发切丝，胡萝卜青椒切丝',
      '调鱼香汁：醋2勺+糖1勺+生抽1勺+淀粉+水',
      '热油滑炒肉丝盛出',
      '炒香豆瓣酱和葱姜蒜',
      '下蔬菜丝翻炒，倒回肉丝',
      '淋入鱼香汁，翻炒均匀出锅'
    ]
  },
  {
    id: 'preset-4',
    name: '麻婆豆腐',
    category: '家常菜',
    audience: 'adult',
    taste: 'heavy',
    isSoup: false,
    isVegetarian: false,
    cookTime: 15,
    ingredients: ['嫩豆腐 1块', '猪肉末 100g', '郫县豆瓣酱', '花椒粉', '蒜', '葱', '生抽', '淀粉'],
    steps: [
      '豆腐切小块，开水焯1分钟捞出',
      '热油炒肉末至变色',
      '加豆瓣酱炒出红油，加蒜末',
      '加适量水，放入豆腐小火煮3分钟',
      '水淀粉勾芡，撒花椒粉和葱花出锅'
    ]
  },
  {
    id: 'preset-5',
    name: '可乐鸡翅',
    category: '家常菜',
    audience: 'all',
    taste: 'medium',
    isSoup: false,
    isVegetarian: false,
    cookTime: 30,
    ingredients: ['鸡翅 8个', '可乐 1罐', '姜', '生抽', '老抽', '料酒'],
    steps: [
      '鸡翅洗净划两刀，冷水下锅加姜料酒焯水',
      '捞出沥干，热油煎至两面金黄',
      '倒入可乐没过鸡翅',
      '加生抽2勺、老抽半勺上色',
      '大火烧开转中火收汁至浓稠'
    ]
  },
  {
    id: 'preset-6',
    name: '回锅肉',
    category: '家常菜',
    audience: 'adult',
    taste: 'heavy',
    isSoup: false,
    isVegetarian: false,
    cookTime: 20,
    ingredients: ['五花肉 300g', '蒜苗', '青椒', '郫县豆瓣酱', '豆豉', '姜', '生抽'],
    steps: [
      '五花肉冷水下锅，加姜片煮至筷子能插入',
      '捞出切片，蒜苗切段，青椒切块',
      '热油煸炒肉片至微微卷曲出油',
      '加豆瓣酱和豆豉炒香',
      '下青椒蒜苗翻炒，生抽调味出锅'
    ]
  },
  {
    id: 'preset-7',
    name: '宫保鸡丁',
    category: '家常菜',
    audience: 'adult',
    taste: 'heavy',
    isSoup: false,
    isVegetarian: false,
    cookTime: 20,
    ingredients: ['鸡胸肉 300g', '花生米', '干辣椒', '花椒', '葱', '姜', '蒜', '醋', '糖', '生抽', '淀粉'],
    steps: [
      '鸡肉切丁，加料酒、生抽、淀粉腌制',
      '花生米小火炒熟备用',
      '调汁：醋2勺+糖1勺+生抽1勺+淀粉+水',
      '热油爆香花椒干辣椒，下鸡丁滑炒',
      '加葱姜蒜，淋入酱汁快速翻炒',
      '撒花生米翻匀出锅'
    ]
  },
  {
    id: 'preset-8',
    name: '蒜蓉西兰花',
    category: '家常菜',
    audience: 'all',
    taste: 'light',
    isSoup: false,
    isVegetarian: true,
    cookTime: 10,
    ingredients: ['西兰花 1颗', '蒜 5瓣', '盐', '蚝油（可选）'],
    steps: [
      '西兰花掰小朵，开水焯1分钟捞出',
      '蒜切末',
      '热油炒香蒜末至微黄',
      '下西兰花翻炒，加盐调味',
      '淋少许蚝油翻匀出锅（可选）'
    ]
  },
  {
    id: 'preset-9',
    name: '红烧排骨',
    category: '家常菜',
    audience: 'all',
    taste: 'medium',
    isSoup: false,
    isVegetarian: false,
    cookTime: 40,
    ingredients: ['排骨 500g', '姜', '葱', '八角 2个', '冰糖', '生抽', '老抽', '料酒'],
    steps: [
      '排骨冷水下锅焯水，捞出洗净',
      '小火炒冰糖至焦糖色',
      '下排骨翻炒上色',
      '加姜葱八角、生抽3勺、老抽1勺、料酒',
      '加热水没过排骨，大火烧开转小火炖30分钟',
      '收汁至浓稠出锅'
    ]
  },
  {
    id: 'preset-10',
    name: '酸辣土豆丝',
    category: '家常菜',
    audience: 'adult',
    taste: 'heavy',
    isSoup: false,
    isVegetarian: true,
    cookTime: 10,
    ingredients: ['土豆 2个', '干辣椒', '花椒', '醋', '盐', '葱'],
    steps: [
      '土豆切细丝，清水浸泡去淀粉',
      '捞出沥干',
      '热油爆香花椒干辣椒',
      '大火快炒土豆丝',
      '沿锅边淋醋，加盐翻炒2分钟',
      '撒葱花出锅——全程大火，保持脆爽'
    ]
  },
  {
    id: 'preset-11',
    name: '清炒时蔬',
    category: '家常菜',
    audience: 'all',
    taste: 'light',
    isSoup: false,
    isVegetarian: true,
    cookTime: 8,
    ingredients: ['时令绿叶菜（空心菜/油麦菜/菠菜任选） 1把', '蒜 3瓣', '盐'],
    steps: [
      '绿叶菜洗净切段，蒜切末',
      '热油炒香蒜末',
      '大火下菜快速翻炒',
      '加盐调味，变软即出锅——不要炒太久'
    ]
  },
  {
    id: 'preset-12',
    name: '蒸水蛋',
    category: '家常菜',
    audience: 'child',
    taste: 'light',
    isSoup: false,
    isVegetarian: false,
    cookTime: 12,
    ingredients: ['鸡蛋 2个', '温水', '盐', '生抽', '香油'],
    steps: [
      '鸡蛋打散，加1.5倍温水搅匀',
      '过筛去气泡（嫩滑的关键）',
      '碗盖保鲜膜扎几个孔',
      '水开后上锅中小火蒸10分钟',
      '淋少许生抽和香油'
    ]
  },
  {
    id: 'preset-13',
    name: '糖醋里脊',
    category: '家常菜',
    audience: 'all',
    taste: 'medium',
    isSoup: false,
    isVegetarian: false,
    cookTime: 25,
    ingredients: ['猪里脊 300g', '鸡蛋 1个', '面粉', '番茄酱', '醋', '糖', '生抽'],
    steps: [
      '里脊切条，加盐、料酒腌制',
      '鸡蛋+面粉调糊，里脊裹糊',
      '六成热油炸至金黄捞出',
      '复炸一次更酥脆',
      '锅中留底油，炒香番茄酱+糖+醋+生抽',
      '倒入炸好的里脊快速翻炒裹汁出锅'
    ]
  },
  {
    id: 'preset-14',
    name: '干煸四季豆',
    category: '家常菜',
    audience: 'adult',
    taste: 'heavy',
    isSoup: false,
    isVegetarian: true,
    cookTime: 15,
    ingredients: ['四季豆 300g', '猪肉末 50g（可选）', '干辣椒', '花椒', '蒜', '生抽', '盐'],
    steps: [
      '四季豆去筋掰段，沥干水分',
      '锅中多油，中小火煸炒四季豆至表皮起皱盛出',
      '留底油炒肉末至变色（可选）',
      '爆香干辣椒花椒蒜末',
      '倒回四季豆翻炒，生抽和盐调味',
      'TIP：一定要煸熟，半生有毒！'
    ]
  },
  {
    id: 'preset-15',
    name: '紫菜蛋花汤',
    category: '家常菜',
    audience: 'all',
    taste: 'light',
    isSoup: true,
    isVegetarian: false,
    cookTime: 10,
    ingredients: ['紫菜', '鸡蛋 1个', '虾皮（可选）', '葱', '盐', '香油'],
    steps: [
      '紫菜撕碎放碗中，加虾皮',
      '水烧开，鸡蛋打散淋入（边倒边搅）',
      '加盐调味',
      '将滚汤冲入紫菜碗中',
      '滴香油撒葱花'
    ]
  },

  // ===== 狠菜 (10道) =====
  {
    id: 'preset-16',
    name: '水煮鱼',
    category: '狠菜',
    audience: 'adult',
    taste: 'heavy',
    isSoup: false,
    isVegetarian: false,
    cookTime: 30,
    ingredients: ['草鱼（或黑鱼） 1条', '豆芽', '干辣椒', '花椒', '郫县豆瓣酱', '姜', '蒜', '蛋清', '淀粉', '盐'],
    steps: [
      '鱼片成薄片，加盐、蛋清、淀粉腌制',
      '豆芽焯水铺碗底',
      '热油炒香豆瓣酱和姜蒜',
      '加水烧开，逐片下鱼片煮至变白（约1分钟）',
      '连汤带鱼倒入碗中',
      '撒大量干辣椒和花椒，淋热油激发香味'
    ]
  },
  {
    id: 'preset-17',
    name: '酸菜鱼',
    category: '狠菜',
    audience: 'adult',
    taste: 'heavy',
    isSoup: false,
    isVegetarian: false,
    cookTime: 25,
    ingredients: ['草鱼 1条', '酸菜 200g', '干辣椒', '花椒', '姜', '蒜', '泡椒', '蛋清', '淀粉', '白醋'],
    steps: [
      '鱼片腌制（同水煮鱼）',
      '酸菜切段，热油炒香酸菜+泡椒+姜蒜',
      '加水烧开煮5分钟出味',
      '逐片下鱼片煮1分钟',
      '出锅前加少许白醋提酸',
      '撒干辣椒花椒淋热油'
    ]
  },
  {
    id: 'preset-18',
    name: '红烧肉',
    category: '狠菜',
    audience: 'all',
    taste: 'medium',
    isSoup: false,
    isVegetarian: false,
    cookTime: 60,
    ingredients: ['五花肉 500g', '姜', '葱', '八角 2个', '桂皮', '香叶', '冰糖', '生抽', '老抽', '料酒'],
    steps: [
      '五花肉切3cm方块，冷水焯水',
      '小火炒冰糖至焦糖色',
      '下五花肉翻炒上色',
      '加姜葱八角桂皮香叶、生抽3勺、老抽1勺、料酒',
      '加开水没过肉，大火烧开转小火炖45分钟',
      '大火收汁至汤汁浓稠裹住每块肉'
    ]
  },
  {
    id: 'preset-19',
    name: '东坡肉',
    category: '狠菜',
    audience: 'all',
    taste: 'medium',
    isSoup: false,
    isVegetarian: false,
    cookTime: 90,
    ingredients: ['五花肉 500g', '葱', '姜', '黄酒', '生抽', '老抽', '冰糖'],
    steps: [
      '五花肉整块焯水定型，切大方块',
      '砂锅底铺葱段姜片',
      '肉皮朝下码入砂锅',
      '加黄酒没过肉一半、生抽、老抽、冰糖',
      '大火烧开转最小火炖1.5小时',
      '翻面皮朝上，再炖半小时至筷子轻松穿透'
    ]
  },
  {
    id: 'preset-20',
    name: '清蒸鲈鱼',
    category: '狠菜',
    audience: 'all',
    taste: 'light',
    isSoup: false,
    isVegetarian: false,
    cookTime: 20,
    ingredients: ['鲈鱼 1条（约500g）', '姜', '葱', '蒸鱼豉油', '料酒'],
    steps: [
      '鱼身划几刀，抹料酒，铺姜片葱段',
      '水开上锅大火蒸8-10分钟',
      '倒掉蒸出的腥水',
      '铺上新葱丝姜丝',
      '淋蒸鱼豉油，浇热油激发香味'
    ]
  },
  {
    id: 'preset-21',
    name: '香辣蟹',
    category: '狠菜',
    audience: 'adult',
    taste: 'heavy',
    isSoup: false,
    isVegetarian: false,
    cookTime: 25,
    ingredients: ['梭子蟹 4只', '干辣椒', '花椒', '姜', '蒜', '葱', '郫县豆瓣酱', '啤酒', '生抽', '淀粉'],
    steps: [
      '蟹洗净去壳去鳃，剁成4块',
      '蟹块裹淀粉，油炸至红壳捞出',
      '热油炒香豆瓣酱+干辣椒+花椒+姜蒜',
      '下蟹块翻炒，加半罐啤酒',
      '加生抽，大火翻炒至汤汁收干',
      '撒葱段出锅'
    ]
  },
  {
    id: 'preset-22',
    name: '辣子鸡',
    category: '狠菜',
    audience: 'adult',
    taste: 'heavy',
    isSoup: false,
    isVegetarian: false,
    cookTime: 25,
    ingredients: ['鸡腿肉 500g', '干辣椒 一大把', '花椒', '姜', '蒜', '料酒', '生抽', '盐', '白芝麻'],
    steps: [
      '鸡腿肉切小块，加料酒、生抽、盐腌制30分钟',
      '六成热油炸至金黄捞出',
      '留底油小火炒香干辣椒和花椒',
      '加姜蒜末',
      '倒入鸡块大火翻炒',
      '撒白芝麻出锅——辣椒要比鸡多才正宗！'
    ]
  },
  {
    id: 'preset-23',
    name: '酱牛肉',
    category: '狠菜',
    audience: 'all',
    taste: 'medium',
    isSoup: false,
    isVegetarian: false,
    cookTime: 90,
    ingredients: ['牛腱子 1kg', '姜', '葱', '八角', '桂皮', '香叶', '花椒', '生抽', '老抽', '黄豆酱', '冰糖'],
    steps: [
      '牛腱子冷水浸泡2小时去血水',
      '冷水下锅焯水捞出',
      '锅中加水、所有调料和香料',
      '放入牛腱子，大火烧开转小火炖1.5小时',
      '关火后让牛肉在汤中浸泡至少2小时',
      '捞出冷藏后切片——越薄越好吃'
    ]
  },
  {
    id: 'preset-24',
    name: '油焖大虾',
    category: '狠菜',
    audience: 'all',
    taste: 'medium',
    isSoup: false,
    isVegetarian: false,
    cookTime: 15,
    ingredients: ['大虾 500g', '姜', '葱', '料酒', '生抽', '糖', '番茄酱（可选）'],
    steps: [
      '虾去虾线，剪须剪脚',
      '热油煎虾至两面变红，用铲子压虾头出虾油',
      '加姜丝、料酒、生抽、糖',
      '加少量水，盖盖焖3分钟',
      '开盖大火收汁，撒葱花'
    ]
  },
  {
    id: 'preset-25',
    name: '葱爆羊肉',
    category: '狠菜',
    audience: 'adult',
    taste: 'heavy',
    isSoup: false,
    isVegetarian: false,
    cookTime: 15,
    ingredients: ['羊肉片 300g', '大葱 2根', '姜', '生抽', '料酒', '孜然粉', '辣椒粉（可选）'],
    steps: [
      '羊肉片加料酒、生抽腌制',
      '大葱斜切段',
      '大火热油，爆炒羊肉至变色立即盛出',
      '同锅炒葱段至微焦',
      '倒回羊肉，加孜然粉、辣椒粉',
      '大火翻匀即可——全程大火，羊肉才嫩'
    ]
  }
]
