import { AnsibleExecutorSchema } from './schema';
import executor from './executor';

const options: AnsibleExecutorSchema = {};

describe('Ansible Executor', () => {
  it('can run', async () => {
    const output = await executor(options);
    expect(output.success).toBe(true);
  });
});