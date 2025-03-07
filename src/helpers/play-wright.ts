import { userEvent } from "@storybook/test";

interface UserType {
  target: HTMLElement;
  value: string;
}

let _instance: PlayWright | null = null;

class PlayWright {
  constructor() {
    if (_instance) {
      return _instance;
    }

    _instance = this;
  }

  getInstance() {
    return this;
  }

  async handleUserType(userTypes: UserType[]) {
    for (let i = 0; i < userTypes.length; i++) {
      const { target, value } = userTypes[i];
      await userEvent.type(target, value, {
        delay: 100,
      });
    }
  }
}

const playWright = Object.freeze(new PlayWright());

export default playWright;
