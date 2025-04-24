'use server'

import { checkRole } from '@/utils/roles'

// Clerk integration removed for fresh install.

export async function setRole(formData: FormData): Promise<void> {
  if (!(await checkRole('admin'))) {
    return;
  }
}

export async function removeRole(formData: FormData): Promise<void> {
}