import DragAndDrop from "@/components/profile/DragAndDrop";
import LinkItem from "../links/LinkItem";

export default function LinksForm() {
  const links = [
    { id: 1, platform: "GitHub", url: "https://github.com/user" },
    { id: 2, platform: "LinkedIn", url: "https://linkedin.com/user" },
  ];

  return (
    <div className="bg-white shadow p-6 rounded-md">
      <h2 className="text-xl font-semibold mb-4">Customize Your Links</h2>
      <DragAndDrop>
        {links.map((link) => (
          <LinkItem key={link.id} url={link.url} />
        ))}
      </DragAndDrop>
      <button className="mt-4 text-blue-500">+ Add new link</button>
    </div>
  );
}
