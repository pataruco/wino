interface MostUsedGrape {
  id: number;
  name: string;
  seo_name: string;
  has_detailed_info: true;
  wines_count: number;
}

export interface Review {
  id: number;
  rating: number;
  note: string;
  language: string;
  created_at: string;
  aggregated: true;
  user: {
    id: number;
    seo_name: string;
    alias: string;
    premium_subscription: boolean | null;
    is_featured: false;
    visibility: string;
    image: {
      location: string;
      variations: {
        large: string;
        small_square: string;
      };
    };
    statistics: {
      followers_count: number;
      followings_count: number;
      ratings_count: number;
      reviews_count: number;
    };
    background_image: string | null;
  };
  vintage: {
    id: number;
    seo_name: string;
    name: string;
    statistics: {
      status: string;
      ratings_count: number;
      ratings_average: number;
      labels_count: number;
      reviews_count: number;
    };
    image: {
      location: string;
      variations: {
        large: string;
        medium: string;
        medium_square: string;
        small_square: string;
      };
    };
    wine: {
      id: number;
      name: string;
      seo_name: string;
      type_id: number;
      region: {
        id: number;
        name: string;
        name_en: string;
        seo_name: string;
        country: {
          code: string;
          name: string;
          native_name: string;
          seo_name: string;
          currency: {
            code: string;
            name: string;
            prefix: string;
            suffix: null;
          };
          regions_count: 1280;
          users_count: 3062764;
          wines_count: 438452;
          wineries_count: 64107;
          most_used_grapes: MostUsedGrape[];
        };
        background_image: {
          location: string;
          variations: {
            large: string;
            medium: string;
          };
        };
      };
      review_status: number;
      winery: {
        id: number;
        name: string;
        seo_name: string;
        status: 0;
        review_status: string;
        statistics: {
          ratings_count: number;
          ratings_average: number;
          labels_count: number;
          wines_count: number;
        };
      };
      style: string | null;
    };
    year: number;
  };
  activity: {
    id: number;
    statistics: {
      likes_count: number;
      comments_count: number;
    };
  };
}
