import { openSans } from '@/styles/fonts';
import { Flex, Image } from '@chakra-ui/react';
import React from 'react';
import RightContent from './RightContetnt/RightContent';
import SearchInput from './SearchInput';

const Navbar: React.FC = () => {
    return (
        <Flex
            className={openSans.className}
            bg="white"
            height="44px"
            padding="6px 12px"
        >
            <Flex align="center">
                <Image
                    src="/images/redditFace.svg"
                    alt="reddit logo"
                    height={'30px'}
                ></Image>
                <Image
                    src="/images/redditText.svg"
                    alt="reddit image title"
                    height={'46px'}
                    display={{ base: 'none', md: 'unset' }}
                ></Image>
            </Flex>
            {/* <Directory /> */}
            <SearchInput />
            <RightContent />
        </Flex>
    );
};
export default Navbar;
