import { AnsibleExecutorSchema } from './schema';

export default async function runExecutor(
  options: AnsibleExecutorSchema,
) {
  console.log('Executor ran for Ansible', options)
  return {
    success: true
  }
}

