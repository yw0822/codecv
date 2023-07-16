export interface IResumeConfig {
  content: string
  style: string
  link: string
}
// export function resumeExport(data: IResumeConfig) {
//   return post('/resume/export', data)
// }

export async function resumeExport(data: IResumeConfig) {
  const res = await fetch('https://codecv.netlify.app/.netlify/functions/export', {
    method: 'POST',
    body: JSON.stringify(data)
  })
  return await res.json()
}
