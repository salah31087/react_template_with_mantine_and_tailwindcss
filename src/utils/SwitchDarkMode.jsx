import { ActionIcon, useMantineColorScheme, useComputedColorScheme } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';


export default function SwitchDarkMode() {
    const { setColorScheme } = useMantineColorScheme({ keepTransitions: true });
    const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

    return (
        <ActionIcon
            onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
            variant="default"
            size="xl"
            aria-label="Toggle color scheme"
        >
            {computedColorScheme === 'light' && <IconSun size={22} stroke={1.5} />}
            {computedColorScheme === 'dark' && <IconMoon size={22} stroke={1.5} />}
        </ActionIcon>
    );
}
