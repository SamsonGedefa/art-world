import { assign, createMachine } from "xstate";
import axios from "axios";

export const likeMachine = createMachine(
  {
    id: "likedPost",
    initial: "toggleLikeUnlike",
    context: {
      likedPosts: [],
    },

    states: {
      idle: {
        on: {
          LIKED: { target: "toggleLikeUnlike" },
        },
      },
      toggleLikeUnlike: {
        invoke: {
          src: "persistLikedPost",
          onDone: {
            actions: [
              assign({
                likedPosts: (_, event) => event.data,
              }),
            ],
            target: "idle",
          },
          onError: {
            target: "idle",
          },
        },
      },
    },
  },

  {
    services: {
      persistLikedPost: async (_, event) => {
        const { postId } = event;

        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const [res1, res2] = await axios.all([
          axios.put(`/api/post/${postId}/likes`, config),
          axios.get(`/api/post/${postId}/likes`, config),
        ]);

        const postArray = Object.values(res2.data);

        const postIds = postArray.map((post) => post.map((id) => id._id));

        const mergedArray = postIds.reduce((a, b) => [...a, ...b]);

        return mergedArray;
      },
    },
  }
);
