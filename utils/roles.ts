import { Roles } from '@/types/globals'
// Clerk integration removed for fresh install.

/**
 * Checks if the current user has the specified role.
 * Must be awaited: await checkRole('admin')
 */
export const checkRole = async (role: Roles): Promise<boolean> => {
  
  // TODO: implement new role checking logic
  return false; // placeholder return value
}