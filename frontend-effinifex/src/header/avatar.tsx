import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import bbva from '@/assets/pngegg.png'; // Ajusta la ruta según donde guardaste la imagen
import memojiImage from '@/assets/memoji.png'; // Ajusta la ruta según donde guardaste la imagen


function AvatarProfile(){


    return(
        <Avatar>
  <AvatarImage className="bg-blue-700"src={memojiImage} />
  <AvatarFallback>CNlop</AvatarFallback>
</Avatar>

    );

}

export default AvatarProfile;