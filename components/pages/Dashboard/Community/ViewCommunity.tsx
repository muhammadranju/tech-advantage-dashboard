"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MessageCircle, MoreHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { GrGroup } from "react-icons/gr";

const posts = [
  {
    id: 1,
    user: {
      name: "Mohammad Rafiul islam",
      avatar:
        "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0",
      initials: "MR",
    },
    timestamp: "12:03 PM",
    content:
      "Hi everyone I'm planning to launch a small e-commerce business selling handmade crafts. What are some low-cost marketing strategies you've tried that actually worked?",
    replies: 23,
    images: [],
  },
  {
    id: 2,
    user: {
      name: "Faisal rabbi",
      avatar:
        "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0",
      initials: "FR",
    },
    timestamp: "1h ago",
    content:
      "Finished, 'A little princess' over the weekend such a powerful memoir!",
    replies: 23,
    images: [
      "https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0",
      "https://images.unsplash.com/photo-1502444330042-d1a1ddf9bb5b?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0",
    ],
  },
  {
    id: 3,
    user: {
      name: "Maherun nesa",
      avatar:
        "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0",
      initials: "MN",
    },
    timestamp: "12:03 PM",
    content:
      "Do you think AI tools will replace traditional customer service jobs in small businesses? Or will they just support human workers? Interested to know your thoughts.",
    replies: 23,
    images: [],
  },
  {
    id: 4,
    user: {
      name: "Jamillur rahman",
      avatar:
        "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0",
      initials: "JR",
    },
    timestamp: "32m ago",
    content:
      "Started a new thriller last night, and I'm already hooked! any guesses on the post?",
    replies: 23,
    images: [],
  },
];

const FeaturedGroupCard = ({
  name,
  image,
}: {
  name: string;
  image: string;
}) => (
  <div className="w-fit p-2 rounded-lg shadow-md">
    <Image
      width={250}
      height={250}
      src={image}
      alt={name}
      className="w-60 h-60 object-cover rounded-xl"
    />
    <div className="mt-2 flex items-center">
      <span className="text-xl mr-1">
        <GrGroup />
      </span>
      <span className="text-base font-semibold">{name}</span>
    </div>
  </div>
);

const PostCard = ({ post }: { post: (typeof posts)[0] }) => (
  <>
    <Card className="w-full shadow-none border-none">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={post.user.avatar || "/placeholder.svg"}
                className="object-cover w-10 h-10"
                alt={post.user.name}
              />
              <AvatarFallback className="bg-neutral-200 text-neutral-700">
                {post.user.initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-neutral-900">
                {post.user.name}{" "}
                <span className="text-sm text-neutral-500">
                  ~ {post.timestamp}
                </span>
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 rounded-full hover:bg-black hover:text-white"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-0 border-b border-neutral-200 pb-2">
        <p className="text-neutral-800 mb-2 leading-relaxed lg:max-w-2/4">
          {post.content}
        </p>

        {post.images.length > 0 && (
          <div className="flex space-x-2">
            {post.images.map((image, index) => (
              <Image
                key={index}
                src={image || "/placeholder.svg"}
                alt={`Post image ${index + 1}`}
                width={400}
                height={400}
                className="w-52 h-52 mb-3 rounded-lg object-cover"
              />
            ))}
          </div>
        )}

        <div className="flex items-center space-x-2 text-neutral-500">
          <Link href={`/dashboard/community/view-community/${post.id}`}>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-neutral-500 hover:text-neutral-700"
            >
              <MessageCircle className="h-4 w-4 mr-1" />
              <span className="text-sm">{post.replies} Replies</span>
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  </>
);

export default function ViewCommunity() {
  return (
    <div className="mx-auto p-10">
      <div className="mb-5">
        <h1 className="text-3xl font-bold text-neutral-900 mb-4">
          Aspiring Business Group
        </h1>
        <FeaturedGroupCard
          name="Aspiring Business Solution"
          image="https://images.pexels.com/photos/708392/pexels-photo-708392.jpeg?cs=srgb&dl=pexels-helenalopes-708392.jpg&fm=jpg"
        />
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
