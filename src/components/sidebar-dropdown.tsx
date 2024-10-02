// import { useState } from 'react';
// import { Menu, MenuItem } from '@mui/material';
// import { MoreVert } from 'lucide-react';

// function ChatSideBar({ active, socket }: any) {
//     const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

//     const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
//         setAnchorEl(event.currentTarget);
//     };

//     const handleMenuClose = () => {
//         setAnchorEl(null);
//     };

//     const handleBlockUser = () => {
//         console.log("User blocked");
//         // Add logic to block user
//         handleMenuClose();
//     };

//     const handleDeleteMessages = () => {
//         console.log("Messages deleted");
//         // Add logic to delete messages
//         handleMenuClose();
//     };

//     const handleArchiveMessages = () => {
//         console.log("Messages archived");
//         // Add logic to archive messages
//         handleMenuClose();
//     };

//     const handleAddToFavorite = () => {
//         console.log("Added to favorite");
//         // Add logic to add user to favorites
//         handleMenuClose();
//     };

//     return (
//         <div className='max-h-screen min-h-screen bg-[#f5f5f5] w-64 p-3 py-7 pt-4 pb-5 flex flex-col'>
//             <div className='flex justify-between mb-3'>
//                 <h2 className='font-medium text-gray-600'>Chat Sidebar</h2>
//                 <div>
//                     <MoreVert
//                         className='cursor-pointer'
//                         onClick={handleMenuClick}
//                     />
//                     <Menu
//                         anchorEl={anchorEl}
//                         open={Boolean(anchorEl)}
//                         onClose={handleMenuClose}
//                     >
//                         <MenuItem onClick={handleBlockUser}>Block User</MenuItem>
//                         <MenuItem onClick={handleDeleteMessages}>Delete Messages</MenuItem>
//                         <MenuItem onClick={handleArchiveMessages}>Archive Messages</MenuItem>
//                         <MenuItem onClick={handleAddToFavorite}>Add to Favorite</MenuItem>
//                     </Menu>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default ChatSideBar;
