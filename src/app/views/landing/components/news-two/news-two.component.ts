import { Component, OnInit, Input } from '@angular/core';
import { butterService } from 'src/app/services/butter-cms.service';
import { WpApiPosts } from 'wp-api-angular';

@Component({
  selector: 'app-news-two',
  templateUrl: './news-two.component.html',
  styleUrls: ['./news-two.component.scss']
})
export class NewsTwoComponent implements OnInit {
  @Input() token;
  posts = [];

  constructor(private wpApiPosts: WpApiPosts) {
    this.getPosts();
  }
  ngOnInit() {
    this.fetchPosts();
  }
  getPosts() {
    this.wpApiPosts.getList()
    .toPromise()
    .then( response => {
      let json: any = response.json();
      this.posts = json;
      console.log(this.posts);
    });
  }
  private fetchPosts() {
    butterService.post.list({
            page: 1,
            page_size: 10
        })
        .then((res) => {
            console.log('Content from ButterCMS');
            console.log(res);
            this.posts = res.data;
        });
}

}
