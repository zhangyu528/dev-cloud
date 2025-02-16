


export const generateWorkspaceName = (name: string) => {
    let baseName = name.trim().replace(/\s+/g, '-');
    let randomNumber = Math.floor(Math.random() * 10000000); // 生成 7 位数字
    return `${baseName}-${randomNumber.toString().padStart(7, '0')}`; // 确保是7位数字
};



export const validateWorkspaceName = (name: string): { isValid: boolean; errorMessage?: string } => {
    // 去除首尾空格
    const trimmedName = name.trim();
  
    // 检查是否为空
    if (!trimmedName) {
      return { 
        isValid: false, 
        errorMessage: ' ' 
      };
    }
  
    // 长度限制（3-30个字符）
    if (trimmedName.length < 1 || trimmedName.length > 20) {
      return { 
        isValid: false, 
        errorMessage: '工作空间名称长度必须在3-30个字符之间' 
      };
    }
  
    // 只允许字母、数字、空格和连字符
    const validNameRegex = /^[a-zA-Z0-9 -]+$/;
    if (!validNameRegex.test(trimmedName)) {
      return { 
        isValid: false, 
        errorMessage: '工作空间名称只能包含字母、数字、空格和连字符' 
      };
    }
  
    // 不允许全数字
    const onlyNumbersRegex = /^[0-9]+$/;
    if (onlyNumbersRegex.test(trimmedName)) {
      return { 
        isValid: false, 
        errorMessage: '工作空间名称不能只包含数字' 
      };
    }
  
    // 通过所有验证
    return { 
      isValid: true 
    };
  };