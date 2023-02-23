import { Flex } from '@chakra-ui/react';
import React from 'react';
import AuthButtons from './AuthButtons';
import AuthModal from '@/components/Modal/Auth/AuthModal';
import { User } from '@firebase/auth';
import Icons from '@/components/Navbar/RightContetnt/Icons';
import UserMenu from '@/components/Navbar/RightContetnt/UserMenu';

type RightContentProps = {
    user?: User | null;
};

const RightContent: React.FC<RightContentProps> = ({ user }) => {
    return (
        <>
            <AuthModal />
            <Flex justify='center' align='center'>
                {user ? <Icons /> : <AuthButtons />}
                <UserMenu user={user}/>
            </Flex>
        </>
    );
};
export default RightContent;
