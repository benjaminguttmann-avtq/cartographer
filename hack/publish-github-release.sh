#!/usr/bin/env bash
# Copyright 2021 VMware
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

set -o errexit
set -o nounset
set -o pipefail

ROOT=$(cd "$(dirname $0)/.." && pwd)
readonly ROOT

readonly RELEASE_NOTES_FILE=${RELEASE_NOTES:-$ROOT/release/CHANGELOG.md}
readonly ASSETS_DIR=${ASSETS_DIR:-$ROOT/release}
readonly RELEASE_VERSION=${RELEASE_VERSION:-"v0.0.0-dev"}

main() {
  cd $ROOT
  submit_release_to_github $RELEASE_VERSION
}

submit_release_to_github() {
  local version=$1

  gh release create $version \
    --draft \
    --notes-file $RELEASE_NOTES_FILE \
    ./release/cartographer.yaml
}

main "$@"
