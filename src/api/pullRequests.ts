import { IssueApiProps } from '.'

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

  async pendingApproval(requested_reviewers: number, reviews: number) {
    return requested_reviewers === reviews
  }
}

export const pullRequests = new PullRequests()
