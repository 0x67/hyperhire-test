import { MoralisConfigValues } from 'moralis';

/**
 * @title MoralisModuleOptions
 * @notice Configuration options interface for Moralis module
 */
export type MoralisModuleOptions = Partial<MoralisConfigValues> & {
  /**
   * @dev set to true if module should be @Global
   */
  isGlobal?: boolean;
};
