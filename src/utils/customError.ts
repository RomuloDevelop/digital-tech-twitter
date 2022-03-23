type CustomErrorOptions = ErrorOptions & {isHandled?: boolean}

class CustomError extends Error {
  options?: CustomErrorOptions

  constructor (message?: string, options?: CustomErrorOptions) {
    super(message, {cause: options?.cause})  
    this.options = options
  }
}

export default CustomError