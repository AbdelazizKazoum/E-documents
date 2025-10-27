/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'carbone' {
  interface CarboneResult {
    [key: string]: any
  }

  interface Carbone {
    render(
      template: string | Buffer,
      data: Record<string, any>,
      callback: (error: Error | null, result: CarboneResult | null) => void
    ): void
  }

  const carbone: Carbone
  export = carbone
}
