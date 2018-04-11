import {binding, GeoPoint} from 'baqend';

declare module 'baqend' {

  interface baqend {
    Tune: binding.EntityFactory<model.Tune>;
    Comment: binding.EntityFactory<model.Comment>;
    Profile: binding.EntityFactory<model.Profile>;
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

    interface Profile extends binding.Entity{
      Username: string;
      user: string;
    }

    interface Comment extends binding.Entity{
      author: User;
      text: string;
    }

    interface Tune extends binding.Entity {
      author: string;
      artists: Set<string>;
      title: string;
      dsc: string;
      ytlink: string;
      splink: string;
      vilink: string;
      otlink: string;
      genre: string;
      likes: Set<User>;
      comments: Set<Comment>;
      img: string;
    }

  }
}
