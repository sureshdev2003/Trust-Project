import { useState, useEffect } from "react";
import { Plus, Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import NewsInputForm from "./news-input-form";

interface NewsArticle {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
  createdAt: string;
}

export default function NewsCardsWithModal() {
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch news articles
  const fetchNews = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/news");
      if (!response.ok) {
        throw new Error("Failed to fetch news");
      }
      const data = await response.json();
      setNewsArticles(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  // Delete news article
  const deleteNews = async (id: number) => {
    if (!confirm("Are you sure you want to delete this news article?")) {
      return;
    }

    try {
      console.log("Attempting to delete article with ID:", id);
      
      const response = await fetch(`/api/news/${id}`, {
        method: "DELETE",
      });

      console.log("Delete response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Delete error response:", errorData);
        throw new Error(errorData.error || "Failed to delete news article");
      }

      const result = await response.json();
      console.log("Delete success:", result);

      // Clear any existing errors
      setError("");
      
      // Refresh the list
      fetchNews();
    } catch (err) {
      console.error("Delete error:", err);
      setError(err instanceof Error ? err.message : "Failed to delete article");
    }
  };

  // Handle successful form submission
  const handleFormSuccess = () => {
    setIsOpen(false);
    fetchNews();
  };

  useEffect(() => {
    fetchNews();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-lg">Loading news articles...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">News Dashboard</h1>

          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add News
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add News Article</DialogTitle>
              </DialogHeader>

              <NewsInputForm onSuccess={handleFormSuccess} />
            </DialogContent>
          </Dialog>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-6">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* News Articles Grid */}
        {newsArticles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No news articles yet.</p>
            <p className="text-gray-400">Click "Add News" to create your first article.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {newsArticles.map((article) => (
              <Card
                key={article.id}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative w-full h-48 bg-gray-100">
                  <img
                    src={article.imageUrl || '/placeholder-image.svg'}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      // Only log error if it's not already the placeholder
                      if (e.currentTarget.src !== '/placeholder-image.svg') {
                        console.error('Image failed to load:', article.imageUrl);
                        e.currentTarget.src = '/placeholder-image.svg';
                      }
                    }}
                    onLoad={() => {
                      // Clean up any blob URLs after successful load
                      if (article.imageUrl?.startsWith('blob:')) {
                        console.warn('Blob URL detected in saved article:', article.imageUrl);
                      }
                    }}
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="line-clamp-2">{article.title}</CardTitle>
                      <CardDescription className="line-clamp-3 mt-2">
                        {article.content}
                      </CardDescription>
                      <p className="text-xs text-gray-500 mt-2">
                        {new Date(article.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteNews(article.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}