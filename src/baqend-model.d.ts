import {binding, GeoPoint} from 'baqend';

declare module 'baqend' {

  interface baqend {
    Tune: binding.EntityFactory<model.Tune>;
    Comment: binding.EntityFactory<model.Comment>
  }

  namespace model {
    interface Device extends binding.Entity {
      deviceOs: string;
    }

    interface Role extends binding.Entity {
      name: string;
      users: Set<User>;
    }

    interface User extends binding.Entity {
      username: string;
      inactive: boolean;
    }

    interface Comment extends binding.Entity{
      author: User;
      text: string;
    }

    interface Tune extends binding.Entity {
      Author: User;
      artist: string;
      title: string;
      dsc: string;
      ytlink: string;
      splink: string;
      vilink: string;
      otlink: string;
      genre: string;
      likes: Set<User>;
      comments: Set<Comment>;
    }

  }
}
