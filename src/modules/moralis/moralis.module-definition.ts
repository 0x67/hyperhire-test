import { ConfigurableModuleBuilder } from '@nestjs/common';
import { MoralisModuleOptions } from './moralis-module-options.interface';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<MoralisModuleOptions>()
    .setExtras(
      {
        isGlobal: true,
      },
      (definition, extras) => {
        return {
          ...definition,
          global: definition.global || extras.isGlobal,
        };
      },
    )
    .build();
