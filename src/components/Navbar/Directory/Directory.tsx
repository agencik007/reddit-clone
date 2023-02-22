import * as React from 'react';
import { Menu, MenuButton, MenuList } from '@chakra-ui/menu';
import { Flex } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

const Directory: React.FC = () => {
    return (
        <Menu>
            <MenuButton cursor='pointer' padding='0 6px' borderRadius={4} _hover={{outline: '1px solid', outlineColor: 'gray.200'}}>
                <Flex align='center'>
                    <Flex align='center'></Flex>
                </Flex>
                <ChevronDownIcon />
            </MenuButton>
            <MenuList></MenuList>
        </Menu>
    );
};

export default Directory;