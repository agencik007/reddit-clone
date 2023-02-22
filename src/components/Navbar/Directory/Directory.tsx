import * as React from 'react';
import { Menu, MenuButton, MenuList } from '@chakra-ui/menu';
import { Flex, Icon, Text } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { TiHome } from 'react-icons/ti';

const Directory: React.FC = () => {
    return (
        <Menu>
            <MenuButton cursor='pointer' padding='0 6px' borderRadius={4}
                        _hover={{ outline: '1px solid', outlineColor: 'gray.200' }}>
                <Flex align='center'>
                    <Flex align='center'>
                        <Icon fontSize={24} mr={{ base: 1, md: 2 }} as={TiHome} />
                        <Flex display={{ base: 'none', lg: 'flex' }}>
                            <Text>Home</Text>
                        </Flex>
                    </Flex>
                    <ChevronDownIcon />
                </Flex>
            </MenuButton>
            <MenuList></MenuList>
        </Menu>
    );
};

export default Directory;