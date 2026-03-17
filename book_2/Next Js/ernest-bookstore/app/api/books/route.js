import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

// TEMP in-memory storage
let books = [
  {
    id: uuidv4(),
    title: "Sample Book",
    link: "https://www.amazon.com",
    img: "https://via.placeholder.com/600/92c952",
  },
];

export async function GET() {
  return NextResponse.json(books);
}

export async function POST(req) {
  const { title, link, img } = await req.json();

  const newBook = {
    id: uuidv4(),
    title,
    link,
    img,
  };

  books.push(newBook);

  return NextResponse.json(newBook);
}