import { IssueApiProps, log } from '.'
import { Reviews } from '../types'

class PullRequests {
  async list({ client, IDNumber, repo }: IssueApiProps) {
    const files = await client.pulls.listFiles({
      ...repo,
      pull_number: IDNumber,
      per_page: 100
    })
    return files.data.map(file => file.filename)
  }

  async changes(Additions: number, deletions: number) {
    return Additions + deletions
  }

  async listReviews({ client, IDNumber, repo }: IssueApiProps) {
    const reviews = await client.pulls.listReviews({
      ...repo,
      pull_number: IDNumber,
      per_page: 100
    })
    return reviews.data
  }

  async pendingReview(reviews: number, requested_reviews: number) {
    return reviews <= requested_reviews
  }

  async requestedChanges(reviews: Reviews): Promise<boolean> {
    log(`Reviews: ` + reviews.toString(), 1)
    let changesRequired: number = 0
    reviews.forEach(review => {
      if (review.state == 'REQUESTED_CHANGES') changesRequired++
    })
    return changesRequired > 0
  }
}

export const pullRequests = new PullRequests()
